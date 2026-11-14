import test from 'node:test';
import assert from 'node:assert/strict';
import {loadState} from '../src/storage.js';

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
    assert.equal(state.soundEnabled,true);
  }finally{delete globalThis.localStorage}
});
