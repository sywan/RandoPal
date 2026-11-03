import test from 'node:test';
import assert from 'node:assert/strict';
import {shuffle,makeGroups,parseCsv,parseDelimited,namesFromRows,parseNames,makeRecordSet,serializeTsv,formatRecord} from '../src/core.js';

test('shuffling preserves all entries, including duplicate names',()=>{
  const input=['甲','甲','乙','丙'];
  for(let i=0;i<30;i++)assert.deepEqual(shuffle(input).sort(),[...input].sort());
});
test('groups preserve members and differ by at most one',()=>{
  const input=Array.from({length:23},(_,i)=>`成員 ${i}`);
  for(const [method,n,expected] of [['count',6,6],['size',4,6]]){
    const groups=makeGroups(input,method,n);
    assert.equal(groups.length,expected);
    assert.deepEqual(groups.flat().sort(),[...input].sort());
    assert.ok(Math.max(...groups.map(g=>g.length))-Math.min(...groups.map(g=>g.length))<=1);
  }
});
test('CSV import handles quoted commas and a name header',()=>{
  const rows=parseCsv('姓名,組別\r\n"王,小明",A\r\n陳小華,B\r\n');
  assert.deepEqual(namesFromRows(rows),['王,小明','陳小華']);
  assert.deepEqual(parseNames('甲，乙\n丙'),['甲','乙','丙']);
});
test('multi-column records remain intact through parsing and grouping',()=>{
  const table=parseCsv('學號,姓名,備註\n001,王小明,甲組\n002,王小明,乙組');
  const data=makeRecordSet(table);
  assert.deepEqual(data.columns,['學號','姓名','備註']);
  assert.deepEqual(data.rows,[['001','王小明','甲組'],['002','王小明','乙組']]);
  assert.equal(formatRecord(data.rows[0],data.columns,[1]),'王小明');
  assert.equal(formatRecord(['003','','備註'],data.columns,[1]),'—');
  assert.deepEqual(makeGroups(data.rows,'count',2).flat().sort((a,b)=>a[0].localeCompare(b[0])),data.rows);
  assert.deepEqual(makeRecordSet(parseDelimited(serializeTsv(data.columns,data.rows),'\t')),data);
});
test('import header choice preserves or removes the first row as requested',()=>{
  const table=parseCsv('001,王小明\n002,陳小華');
  assert.deepEqual(makeRecordSet(table,false),{columns:['欄位 1','欄位 2'],rows:[['001','王小明'],['002','陳小華']]});
  assert.deepEqual(makeRecordSet(parseCsv('姓名\n王小明\n陳小華'),true),{columns:['姓名'],rows:[['王小明'],['陳小華']]});
  assert.deepEqual(makeRecordSet(parseCsv('王小明\n陳小華'),false),{columns:['欄位 1'],rows:[['王小明'],['陳小華']]});
});
