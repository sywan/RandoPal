import test from 'node:test';
import assert from 'node:assert/strict';
import {loadState,stateForStorage} from '../src/storage.js';

test('older person rosters gain a separate team roster without losing data',async()=>{
  const old={rosters:[{id:'class-a',name:'Class A',columns:['Student ID','Name'],rows:[['001','Alex']],displayColumns:[1],picked:[]}],selectedId:'class-a',soundEnabled:true};
  globalThis.localStorage={getItem:()=>JSON.stringify(old)};
  try{
    const state=await loadState();
    assert.equal(state.rosters.find(r=>r.id==='class-a').kind,'person');
    assert.deepEqual(state.rosters.find(r=>r.id==='class-a').rows,[['001','Alex']]);
    assert.equal(state.selectedId,'class-a');
    assert.equal(state.rosters.find(r=>r.id===state.selectedTeamId).kind,'team');
    assert.equal(state.rosters.find(r=>r.id===state.selectedTaskId).kind,'task');
    assert.equal(state.selectedNormalTaskId,state.selectedTaskId);
    assert.equal(state.rosters.find(r=>r.id===state.selectedRoleId).kind,'role');
    for(const id of ['demo-topics','demo-formats','demo-twists','demo-bingo'])assert.equal(state.rosters.find(r=>r.id===id).kind,'task');
    assert.equal(state.creativeDecks.bingo,'demo-bingo');
    assert.deepEqual(state.rotationHistory,{});
    assert.equal(state.rosters.find(r=>r.id===state.selectedSeatId).kind,'seat');
    assert.equal(state.rosters.find(r=>r.id===state.selectedResourceId).kind,'resource');
    assert.deepEqual(state.seatOverrides,{});
    assert.deepEqual(state.seatSessions,{});
    assert.deepEqual(state.bracketSessions,{});
    assert.deepEqual(state.ladderSessions,{});
    assert.equal(state.soundEnabled,true);
  }finally{delete globalThis.localStorage}
});
test('turning off progress persistence keeps rosters but omits all game sessions',()=>{
  const data={rememberProgress:false,lastMode:'bracket',playProgress:{sessions:{sample:{order:[1]}}},rosters:[{id:'class-a',rows:[['Alex']],picked:[0]}],rotationHistory:{a:{turns:[0]}},seatOverrides:{a:{0:false}},seatSessions:{a:{b:{assignments:[]}}},bracketSessions:{a:[[]]},ladderSessions:{a:{locked:true}}};
  const saved=stateForStorage(data);
  assert.deepEqual(saved.rosters[0].rows,[['Alex']]);
  assert.deepEqual(saved.rosters[0].picked,[]);
  assert.equal(saved.playProgress,null);
  assert.equal(saved.lastMode,'pick');
  for(const key of ['rotationHistory','seatOverrides','seatSessions','bracketSessions','ladderSessions'])assert.deepEqual(saved[key],{});
  assert.deepEqual(data.rosters[0].picked,[0]);
});
