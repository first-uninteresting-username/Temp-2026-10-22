const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require('node:path').join(__dirname, '../assets/theme.js'), 'utf8');

function environment({ saved = null, systemDark = false, blocked = false } = {}) {
  const events = {}, systemEvents = {}, buttonEvents = {}, attrs = {};
  const values = new Map(saved ? [['obywatelska-theme', saved]] : []);
  const icon = {}, meta = {}, root = { dataset: {} };
  const button = { setAttribute: (key, value) => attrs[key] = value,
    querySelector: () => icon, addEventListener: (type, fn) => buttonEvents[type] = fn };
  const system = { matches: systemDark, addEventListener: (type, fn) => systemEvents[type] = fn };
  const document = { documentElement: root, readyState: 'loading',
    querySelector: () => meta, getElementById: () => button,
    addEventListener: (type, fn) => events[type] = fn };
  const window = { matchMedia: () => system, addEventListener: (type, fn) => events[type] = fn };
  const localStorage = { getItem: key => { if (blocked) throw Error('unavailable'); return values.get(key) || null; },
    setItem: (key, value) => { if (blocked) throw Error('unavailable'); values.set(key, value); } };
  vm.runInNewContext(code, { window, document, localStorage });
  return { root, meta, attrs, icon, values, system, events, systemEvents, buttonEvents };
}

test('Motyw systemowy jest zastosowany przed DOMContentLoaded', () => {
  const e = environment({ systemDark: true });
  assert.equal(e.root.dataset.theme, 'dark');
  assert.equal(e.meta.content, '#171923');
  e.events.DOMContentLoaded();
  assert.equal(e.attrs['aria-pressed'], 'true');
  assert.equal(e.attrs['aria-label'], 'Włącz tryb jasny');
});

test('Przełącznik zapamiętuje wybór i nie zastępuje go zmianą motywu systemu', () => {
  const e = environment(); e.events.DOMContentLoaded();
  e.buttonEvents.click();
  assert.equal(e.root.dataset.theme, 'dark');
  assert.equal(e.values.get('obywatelska-theme'), 'dark');
  e.systemEvents.change(); assert.equal(e.root.dataset.theme, 'dark');
  e.buttonEvents.click();
  assert.equal(e.root.dataset.theme, 'light');
  assert.equal(e.attrs['aria-pressed'], 'false');
  assert.equal(e.attrs['aria-label'], 'Włącz tryb ciemny');
});

test('Zapisany wybór ma pierwszeństwo przed systemem', () => {
  assert.equal(environment({ saved: 'light', systemDark: true }).root.dataset.theme, 'light');
  assert.equal(environment({ saved: 'dark', systemDark: false }).root.dataset.theme, 'dark');
});

test('Bez ręcznego wyboru zmiany ustawień systemu są śledzone', () => {
  const e = environment(); e.system.matches = true; e.systemEvents.change();
  assert.equal(e.root.dataset.theme, 'dark');
});

test('Niedostępny localStorage i niepoprawne preferencje nie blokują przełącznika', () => {
  const e = environment({ blocked: true }); e.events.DOMContentLoaded();
  e.buttonEvents.click(); assert.equal(e.root.dataset.theme, 'dark');
  assert.equal(environment({ saved: 'invalid', systemDark: true }).root.dataset.theme, 'dark');
});

test('Zmiana w drugiej karcie synchronizuje motyw, a usunięcie wyboru przywraca ustawienia systemowe', () => {
  const e = environment({ saved: 'dark' }); e.events.DOMContentLoaded();
  e.events.storage({ key: 'obywatelska-theme', newValue: 'light' });
  assert.equal(e.root.dataset.theme, 'light');
  e.system.matches = true;
  e.events.storage({ key: 'obywatelska-theme', newValue: null });
  assert.equal(e.root.dataset.theme, 'dark');
});
