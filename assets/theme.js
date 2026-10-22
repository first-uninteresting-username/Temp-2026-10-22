/* Runs before styles are painted to avoid a bright flash in dark mode. */
(() => {
  'use strict';
  const key = 'obywatelska-theme';
  const root = document.documentElement;
  const system = window.matchMedia?.('(prefers-color-scheme: dark)');
  const valid = value => value === 'dark' || value === 'light';
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  if (!valid(preference)) preference = null;

  function apply() {
    const theme = preference || (system?.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#171923' : '#f7f8fa';
    const button = document.getElementById('theme-toggle');
    if (button) {
      const label = dark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny';
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-pressed', String(dark));
      button.title = label;
      button.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
    }
  }
  apply();
  function connect() {
    apply();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch {}
      apply();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connect, { once: true });
  } else connect();
  system?.addEventListener?.('change', () => { if (!preference) apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : null;
      apply();
    }
  });
})();
