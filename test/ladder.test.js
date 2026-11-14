import test from 'node:test';
import assert from 'node:assert/strict';
import {LADDER_MAX_LANES,makeLadderSession,canPlaceRung,toggleRung,addRandomRung,traceLadder,lockLadder} from '../src/ladder.js';

test('adjacent rungs cannot collide and each path has one unique endpoint',()=>{
  const session=makeLadderSession(8);
  let rungs=toggleRung([],2,1,8,session.levels);
  assert.equal(canPlaceRung(rungs,2,2,8,session.levels),false);
  assert.equal(toggleRung(rungs,2,2,8,session.levels),rungs);
  rungs=toggleRung(rungs,2,4,8,session.levels);
  rungs=toggleRung(rungs,4,3,8,session.levels);
  const ends=Array.from({length:8},(_,i)=>traceLadder(i,rungs,8,session.levels).end);
  assert.deepEqual(ends.slice().sort((a,b)=>a-b),[0,1,2,3,4,5,6,7]);
  assert.equal(traceLadder(1,[{level:2,gap:1}],8,session.levels).end,2);
  assert.equal(traceLadder(2,[{level:2,gap:1}],8,session.levels).end,1);
});
test('automatic rungs preserve legal topology and final resource shuffle is a permutation',()=>{
  let session=makeLadderSession(6);
  for(let i=0;i<60;i++)session.rungs=addRandomRung(session.rungs,session.count,session.levels);
  for(const rung of session.rungs){
    const others=session.rungs.filter(item=>item!==rung);
    assert.equal(canPlaceRung(others,rung.level,rung.gap,session.count,session.levels),true);
  }
  const locked=lockLadder(session);
  assert.equal(locked.locked,true);
  assert.deepEqual(locked.resourceOrder.slice().sort((a,b)=>a-b),[0,1,2,3,4,5]);
  assert.throws(()=>makeLadderSession(LADDER_MAX_LANES+1),RangeError);
});
test('every supported ladder size keeps a one-to-one assignment after random rungs',()=>{
  for(let count=2;count<=LADDER_MAX_LANES;count++){
    const session=makeLadderSession(count);
    for(let i=0;i<count*3;i++)session.rungs=addRandomRung(session.rungs,count,session.levels);
    const ends=Array.from({length:count},(_,i)=>traceLadder(i,session.rungs,count,session.levels).end).sort((a,b)=>a-b);
    assert.deepEqual(ends,Array.from({length:count},(_,i)=>i));
  }
});
