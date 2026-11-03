import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {setLanguage,t,staticEnglish,translationCatalogComplete} from '../src/i18n.js';
import {makeRecordSet} from '../src/core.js';

test('Chinese and English translation catalogs match',()=>{
  assert.equal(translationCatalogComplete(),true);
});

test('static Chinese interface text has an English translation',()=>{
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const allowed=new Set(['中文','語言 / Language']);
  const labels=[...html.matchAll(/>([^<>]+)</g)].map(match=>match[1].trim());
  const attributes=[...html.matchAll(/(?:aria-label|title|placeholder|alt)="([^"]+)"/g)].map(match=>match[1].replaceAll('&#10;','\n'));
  const missing=[...labels,...attributes].filter(value=>/[\u3400-\u9fff]/u.test(value)&&!allowed.has(value)&&!Object.hasOwn(staticEnglish,value));
  assert.deepEqual([...new Set(missing)],[]);
});

test('language selection translates messages and generated column labels',()=>{
  globalThis.document={documentElement:{lang:''}};
  setLanguage('en');
  assert.equal(t('members',{count:3}),'3 members');
  assert.equal(t('person',{count:1}),'1 person');
  assert.deepEqual(makeRecordSet([['Alex','A1']],false,'en').columns,['Column 1','Column 2']);
  setLanguage('zh-Hant');
  assert.equal(t('members',{count:3}),'3 位成員');
  assert.deepEqual(makeRecordSet([['小明','A1']],false,'zh-Hant').columns,['欄位 1','欄位 2']);
  delete globalThis.document;
});
