import test from 'node:test';
import assert from 'node:assert/strict';
import {shuffle,makeGroups,planTeamMatches,makeTeamMatches,assignRoles,makeReviewCircuit,drawIdeaPair,makeBingoCard,fairTurnIndex,makeMixerRounds,seatAvailable,assignSeats,startBracket,makeBracketRound,parseCsv,parseDelimited,namesFromRows,parseNames,makeRecordSet,serializeTsv,formatRecord} from '../src/core.js';

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
test('team matching keeps whole rows and never leaves one team alone',()=>{
  const teams=Array.from({length:5},(_,i)=>[String(i+1),`第 ${i+1} 組`,String(i+3)]);
  for(const [method,number] of [['size',2],['count',3]]){
    const matches=makeTeamMatches(teams,method,number);
    assert.equal(matches.length,2);
    assert.deepEqual(matches.map(match=>match.length).sort(),[2,3]);
    assert.deepEqual(matches.flat().sort((a,b)=>a[0]-b[0]),teams);
  }
  assert.deepEqual(planTeamMatches(8,'size',3).sizes,[3,3,2]);
  assert.deepEqual(makeTeamMatches([teams[0]],'size',2),[]);
});
test('role assignments keep each role unique and rotate on a second draw',()=>{
  const people=['甲','乙','丙','丁'].map(name=>[name]),roles=['主持','記錄','報告'].map(name=>[name]);
  const first=assignRoles(people,roles),second=assignRoles(people,roles,first);
  assert.equal(first.length,3);
  assert.equal(new Set(first.map(item=>item.target[0])).size,3);
  assert.equal(new Set(first.map(item=>item.role[0])).size,3);
  assert.equal(second.filter(item=>first.some(old=>old.target[0]===item.target[0]&&old.role[0]===item.role[0])).length,0);
});
test('review circuit assigns each team a different reviewer in each round',()=>{
  const teams=Array.from({length:5},(_,i)=>[String(i+1),`第 ${i+1} 組`]);
  const circuit=makeReviewCircuit(teams,9);
  assert.equal(circuit.length,4);
  for(const round of circuit){
    assert.equal(round.length,5);
    assert.ok(round.every(({reviewer,subject})=>reviewer!==subject));
    assert.deepEqual(round.map(pair=>pair.reviewer).sort((a,b)=>a[0]-b[0]),teams);
  }
  for(const team of teams){
    const subjects=circuit.flat().filter(pair=>pair.reviewer===team).map(pair=>pair.subject);
    assert.equal(new Set(subjects).size,4);
  }
});
test('idea mixer uses every pair once and skips self-pairs for one deck',()=>{
  const rows=['A','B','C'].map(value=>[value]),used=[];
  for(let i=0;i<6;i++){const pair=drawIdeaPair(rows,rows,used,true);assert.ok(pair);assert.notEqual(pair[0],pair[1]);used.push(pair)}
  assert.equal(new Set(used.map(pair=>pair.join(':'))).size,6);
  assert.equal(drawIdeaPair(rows,rows,used,true),null);
});
test('bingo cards have unique complete grids at supported sizes',()=>{
  const prompts=Array.from({length:25},(_,i)=>[String(i)]);
  for(const size of [3,4,5]){const card=makeBingoCard(prompts,size);assert.equal(card.length,size*size);assert.equal(new Set(card).size,size*size)}
  assert.deepEqual(makeBingoCard(prompts.slice(0,8),3),[]);
  assert.deepEqual(makeBingoCard([...prompts.slice(0,8),prompts[0]],3),[]);
  assert.deepEqual(makeBingoCard(prompts,6),[]);
});
test('fair turns balance selection counts and avoid an immediate repeat when tied',()=>{
  const history=[];
  for(let i=0;i<12;i++){const next=fairTurnIndex(3,history);assert.ok(next>=0&&next<3);if(i>0&&i%3!==0)assert.notEqual(next,history.at(-1));history.push(next)}
  assert.deepEqual([0,1,2].map(i=>history.filter(value=>value===i).length),[4,4,4]);
  assert.equal(fairTurnIndex(0,history),-1);
});
test('mixer rounds keep everyone at one table and avoid prior partners when possible',()=>{
  const prior=[[[0,1],[2,3]]],rounds=makeMixerRounds(4,2,2,prior);
  assert.equal(rounds.length,2);
  for(const round of rounds){assert.deepEqual(round.map(group=>group.length),[2,2]);assert.deepEqual(round.flat().sort((a,b)=>a-b),[0,1,2,3])}
  const pairs=[...prior,...rounds].flatMap(round=>round.map(group=>group.slice().sort((a,b)=>a-b).join(':')));
  assert.equal(new Set(pairs).size,6);
});
test('seat shuffle respects availability and accounts for people without seats',()=>{
  assert.equal(seatAvailable(['A1','不可用'],['座位','狀態']),false);
  assert.equal(seatAvailable(['A2','可用'],['座位','狀態']),true);
  assert.equal(seatAvailable(['B1','blocked'],['Seat','Status']),false);
  const result=assignSeats(5,[0,2,4]);
  assert.equal(result.assignments.length,3);
  assert.equal(result.unseated.length,2);
  assert.deepEqual([...result.assignments.map(item=>item.person),...result.unseated].sort((a,b)=>a-b),[0,1,2,3,4]);
  assert.deepEqual(result.assignments.map(item=>item.seat).sort((a,b)=>a-b),[0,2,4]);
});
test('bracket pairs everyone once and advances odd entrants with a bye',()=>{
  const rounds=startBracket(5);
  assert.equal(rounds.length,1);
  assert.deepEqual(rounds[0].flatMap(match=>[match.a,match.b].filter(value=>value!==null)).sort((a,b)=>a-b),[0,1,2,3,4]);
  assert.equal(rounds[0].filter(match=>match.b===null&&match.winner===match.a).length,1);
  assert.deepEqual(makeBracketRound([2,4,1]),[{a:2,b:4,winner:null},{a:1,b:null,winner:1}]);
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
