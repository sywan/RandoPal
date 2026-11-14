import {randomInt} from './core.js';

export const LADDER_MAX_LANES=24;
export function ladderLevels(count){return Math.min(26,Math.max(12,Math.ceil(count*1.3)))}
export function canPlaceRung(rungs,level,gap,count,levels){
  return Number.isInteger(level)&&level>=0&&level<levels&&Number.isInteger(gap)&&gap>=0&&gap<count-1&&
    !rungs.some(rung=>rung.level===level&&Math.abs(rung.gap-gap)<=1);
}
export function toggleRung(rungs,level,gap,count,levels){
  const index=rungs.findIndex(rung=>rung.level===level&&rung.gap===gap);
  if(index>=0)return rungs.filter((_,i)=>i!==index);
  return canPlaceRung(rungs,level,gap,count,levels)?[...rungs,{level,gap}]:rungs;
}
export function addRandomRung(rungs,count,levels){
  const open=[];
  for(let level=0;level<levels;level++)for(let gap=0;gap<count-1;gap++)if(canPlaceRung(rungs,level,gap,count,levels))open.push({level,gap});
  return open.length?[...rungs,open[randomInt(open.length)]]:rungs;
}
export function traceLadder(start,rungs,count,levels){
  if(!Number.isInteger(start)||start<0||start>=count)throw new RangeError('invalid start');
  let lane=start;const points=[[lane,0]];
  for(let level=0;level<levels;level++){
    const y=level+1;points.push([lane,y]);
    const right=rungs.some(rung=>rung.level===level&&rung.gap===lane);
    const left=rungs.some(rung=>rung.level===level&&rung.gap===lane-1);
    if(right||left){lane+=right?1:-1;points.push([lane,y])}
  }
  points.push([lane,levels+1]);return {end:lane,points};
}
export function makeLadderSession(count){
  if(!Number.isSafeInteger(count)||count<2||count>LADDER_MAX_LANES)throw new RangeError('invalid ladder size');
  return {count,levels:ladderLevels(count),rungs:[],resourceOrder:Array.from({length:count},(_,i)=>i),locked:false,revealed:[],focused:null};
}
export function lockLadder(session){return {...session,locked:true,revealed:[],focused:null}}
