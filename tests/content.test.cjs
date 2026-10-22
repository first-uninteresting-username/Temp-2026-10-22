const {test}=require('node:test');
const assert=require('node:assert/strict');
global.window={};
require('../assets/data.js');require('../assets/questions.js');
const {chapters,terms,questions}=window.STUDY;
test('Zakres: pięć tematów, 48 definicji, 23 priorytety i 60 pytań',()=>{
 assert.equal(chapters.length,5);assert.equal(terms.length,48);
 assert.equal(terms.filter(t=>t.priority).length,23);assert.equal(questions.length,60);
 assert.equal(new Set(terms.map(t=>t.id)).size,terms.length);
 assert.equal(new Set(questions.map(t=>t.id)).size,questions.length);
});
test('Każde pytanie ma cztery różne odpowiedzi, wyjaśnienie i istniejącą definicję',()=>{
 for(const q of questions){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert.ok(q.explanation.length>30,q.id);assert.ok(terms.some(t=>t.name===q.term),q.id);assert.ok(chapters.some(c=>c.id===q.chapter),q.id);}
});
test('Każdy temat wystarcza do zrównoważonego losowania i każdy priorytet ma pytanie',()=>{
 for(const c of chapters)assert.equal(questions.filter(q=>q.chapter===c.id).length,12,c.id);
 for(const t of terms.filter(t=>t.priority))assert.ok(questions.some(q=>q.term===t.name),t.name);
});
test('Każde pojęcie ma definicję, rozwinięcie, przykład i rozróżnienie',()=>{
 for(const t of terms){assert.ok(chapters.some(c=>c.id===t.chapter),t.id);for(const key of ['definition','detail','example','trap'])assert.ok(t[key].length>20,`${t.name}: ${key}`);}
});
