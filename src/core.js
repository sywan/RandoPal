export function randomInt(max){
  if(!Number.isSafeInteger(max)||max<1)throw new RangeError('max must be positive');
  const limit=Math.floor(0x100000000/max)*max;
  const value=new Uint32Array(1);
  do{crypto.getRandomValues(value)}while(value[0]>=limit);
  return value[0]%max;
}
export function shuffle(items){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=randomInt(i+1);[result[i],result[j]]=[result[j],result[i]]}
  return result;
}
export function parseNames(text){return text.split(/[\n\r,，、;；\t]+/).map(x=>x.trim()).filter(Boolean)}
export function makeGroups(items,method,number){
  if(!items.length)return [];
  const n=Math.max(1,Math.min(items.length,Math.floor(Number(number)||1)));
  const count=method==='size'?Math.ceil(items.length/n):n;
  const groups=Array.from({length:count},()=>[]);
  shuffle(items).forEach((item,i)=>groups[i%count].push(item));
  return groups;
}
export function planTeamMatches(total,method,number){
  if(total<2)return {count:0,sizes:[]};
  const requested=Math.max(1,Math.floor(Number(number)||1));
  // Every match needs at least two existing teams. An odd remainder joins a match.
  const count=Math.min(Math.floor(total/2),method==='size'?Math.ceil(total/Math.max(2,requested)):requested);
  const sizes=Array.from({length:count},(_,i)=>Math.floor(total/count)+(i<total%count?1:0));
  return {count,sizes};
}
export function makeTeamMatches(items,method,number){
  const {count}=planTeamMatches(items.length,method,number);
  if(!count)return [];
  const matches=Array.from({length:count},()=>[]);
  shuffle(items).forEach((item,i)=>matches[i%count].push(item));
  return matches;
}
export function assignRoles(targets,roles,previous=[]){
  if(!targets.length||!roles.length)return [];
  const selected=shuffle(targets).slice(0,roles.length);
  const prior=new Map(previous.map(({target,role})=>[JSON.stringify(target),JSON.stringify(role)]));
  let best=[],fewest=Infinity;
  for(let attempt=0;attempt<40;attempt++){
    const candidate=shuffle(roles).slice(0,selected.length).map((role,i)=>({target:selected[i],role}));
    const repeats=candidate.filter(({target,role})=>prior.get(JSON.stringify(target))===JSON.stringify(role)).length;
    if(repeats<fewest){best=candidate;fewest=repeats}
    if(!repeats)break;
  }
  return best;
}
export function makeReviewCircuit(teams,requestedRounds){
  if(teams.length<2)return [];
  const ordered=shuffle(teams),rounds=Math.min(teams.length-1,Math.max(1,Math.floor(Number(requestedRounds)||1)));
  return Array.from({length:rounds},(_,round)=>ordered.map((reviewer,i)=>({reviewer,subject:ordered[(i+round+1)%ordered.length]})));
}
export function drawIdeaPair(left,right,used=[],sameDeck=false){
  const choices=[];
  for(let a=0;a<left.length;a++)for(let b=0;b<right.length;b++){
    if(sameDeck&&a===b)continue;
    if(!used.some(pair=>pair[0]===a&&pair[1]===b))choices.push([a,b]);
  }
  return choices.length?choices[randomInt(choices.length)]:null;
}
export function makeBingoCard(rows,size){
  const count=Math.floor(Number(size));
  const unique=[...new Map(rows.map(row=>[JSON.stringify(row),row])).values()];
  if(![3,4,5].includes(count)||unique.length<count*count)return [];
  return shuffle(unique).slice(0,count*count);
}
export function fairTurnIndex(total,history=[]){
  if(!Number.isSafeInteger(total)||total<1)return -1;
  const counts=Array(total).fill(0);
  for(const index of history)if(Number.isInteger(index)&&index>=0&&index<total)counts[index]++;
  const fewest=Math.min(...counts),last=history.at(-1);
  let choices=counts.flatMap((count,i)=>count===fewest?[i]:[]);
  if(choices.length>1)choices=choices.filter(i=>i!==last);
  return choices[randomInt(choices.length)];
}
export function makeMixerRounds(total,requestedSize,requestedRounds,priorRounds=[]){
  if(!Number.isSafeInteger(total)||total<2)return [];
  const size=Math.max(2,Math.min(total,Math.floor(Number(requestedSize)||2)));
  const count=Math.min(10,Math.max(1,Math.floor(Number(requestedRounds)||1)));
  const tableCount=Math.ceil(total/size),history=[...priorRounds],result=[];
  const pairs=groups=>groups.flatMap(group=>group.flatMap((a,i)=>group.slice(i+1).map(b=>a<b?`${a}:${b}`:`${b}:${a}`)));
  const occurrences=new Map();for(const round of history)for(const pair of pairs(round))occurrences.set(pair,(occurrences.get(pair)||0)+1);
  for(let round=0;round<count;round++){
    let best=null,bestScore=Infinity;const previous=new Set(pairs(history.at(-1)||[]));
    for(let attempt=0;attempt<120;attempt++){
      const groups=Array.from({length:tableCount},()=>[]);
      shuffle(Array.from({length:total},(_,i)=>i)).forEach((person,i)=>groups[i%tableCount].push(person));
      const score=pairs(groups).reduce((sum,pair)=>sum+(occurrences.get(pair)||0)*4+(previous.has(pair)?3:0),0);
      if(score<bestScore){best=groups;bestScore=score}if(score===0)break;
    }
    result.push(best);history.push(best);for(const pair of pairs(best))occurrences.set(pair,(occurrences.get(pair)||0)+1);
  }
  return result;
}
export function seatAvailable(row,columns){
  const index=columns.findIndex(name=>/^(狀態|可用|availability|available|status)$/i.test(String(name).trim()));
  if(index<0)return true;
  const value=String(row[index]??'').trim().toLowerCase();
  return !/^(不可用|停用|封閉|否|無|0|no|false|blocked|unavailable|closed|disabled)$/i.test(value);
}
export function makeSeatGrid(rowCount,columnCount){
  const rows=Number(rowCount),columns=Number(columnCount);
  if(!Number.isInteger(rows)||!Number.isInteger(columns)||rows<1||rows>16||columns<1||columns>16)return [];
  return Array.from({length:rows},(_,row)=>Array.from({length:columns},(_,column)=>[`${String.fromCharCode(65+row)}${column+1}`])).flat();
}
const seatOffsets={
  none:[],horizontal:[[0,-1],[0,1]],vertical:[[-1,0],[1,0]],rowGap:[],columnGap:[],
  four:[[-1,0],[1,0],[0,-1],[0,1]],
  eight:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
};
export function seatNeighborIndices(index,columns,total,rule){
  if(!Number.isInteger(columns)||columns<1||!Number.isInteger(index)||index<0||index>=total)return [];
  const row=Math.floor(index/columns),column=index%columns;
  if(rule==='rowGap'||rule==='columnGap')return Array.from({length:total},(_,i)=>i).filter(i=>rule==='rowGap'?Math.abs(Math.floor(i/columns)-row)===1:Math.abs(i%columns-column)===1);
  return (seatOffsets[rule]||[]).flatMap(([dy,dx])=>{
    const nextColumn=column+dx,nextRow=row+dy,next=nextRow*columns+nextColumn;
    return nextColumn>=0&&nextColumn<columns&&nextRow>=0&&next<total?[next]:[];
  });
}
export function chooseSeparatedSeats(availableIndices,columns,total,rule){
  const available=[...new Set(availableIndices)].filter(index=>Number.isInteger(index)&&index>=0&&index<total);
  if(rule==='none'||!seatOffsets[rule])return available;
  let best=[];
  const tryOrder=order=>{
    const blocked=new Set(),chosen=[];
    for(const index of order){
      if(blocked.has(index))continue;
      chosen.push(index);blocked.add(index);
      for(const neighbor of seatNeighborIndices(index,columns,total,rule))blocked.add(neighbor);
    }
    if(chosen.length>best.length)best=chosen;
  };
  const priority=(index,rowParity,columnParity)=>{
    const row=Math.floor(index/columns),column=index%columns;
    if(rule==='horizontal')return column%2===columnParity;
    if(rule==='vertical')return row%2===rowParity;
    if(rule==='rowGap')return row%2===rowParity;
    if(rule==='columnGap')return column%2===columnParity;
    if(rule==='four')return (row+column)%2===rowParity;
    return row%2===rowParity&&column%2===columnParity;
  };
  for(const rowParity of [0,1])for(const columnParity of [0,1]){
    const preferred=available.filter(index=>priority(index,rowParity,columnParity));
    const other=available.filter(index=>!priority(index,rowParity,columnParity));
    tryOrder([...shuffle(preferred),...shuffle(other)]);
  }
  for(let attempt=0;attempt<80;attempt++)tryOrder(shuffle(available));
  return best;
}
export function assignSeats(personCount,availableIndices){
  const people=shuffle(Array.from({length:personCount},(_,i)=>i)),seats=shuffle(availableIndices);
  return {assignments:people.slice(0,seats.length).map((person,i)=>({person,seat:seats[i]})),unseated:people.slice(seats.length)};
}
export function seatGridRows(seats,columns,assignments,people,seatIsOpen,seatLabel,personLabel,blockedLabel,reservedLabel,rule='none'){
  const occupied=new Map(assignments.map(({seat,person})=>[seat,person]));
  const reserved=new Set();
  for(const index of occupied.keys())for(const neighbor of seatNeighborIndices(index,columns,seats.length,rule))if(!occupied.has(neighbor))reserved.add(neighbor);
  const rows=[];
  for(let start=0;start<seats.length;start+=columns){
    rows.push(seats.slice(start,start+columns).map((seat,offset)=>{
      const index=start+offset,name=seatLabel(seat);
      if(!seatIsOpen(index))return `${name} · ${blockedLabel}`;
      if(occupied.has(index))return `${name} · ${personLabel(people[occupied.get(index)])}`;
      return reserved.has(index)?`${name} · ${reservedLabel}`:name;
    }));
  }
  return rows;
}
export function makeBracketRound(entrants){
  const matches=[];
  for(let i=0;i<entrants.length;i+=2)matches.push({a:entrants[i],b:entrants[i+1]??null,winner:entrants[i+1]===undefined?entrants[i]:null});
  return matches;
}
export function completeBracket(rounds){
  if(!rounds.length)return rounds;
  let size=rounds[0].length;
  for(let index=1;size>1;index++){
    size=Math.ceil(size/2);
    rounds[index]??=Array.from({length:size},()=>({a:null,b:null,winner:null}));
  }
  for(let index=1;index<rounds.length;index++)for(let matchIndex=0;matchIndex<rounds[index].length;matchIndex++){
    const match=rounds[index][matchIndex],left=rounds[index-1][matchIndex*2],right=rounds[index-1][matchIndex*2+1];
    match.a=left?.winner??null;match.b=right?.winner??null;
    if(right===undefined)match.winner=match.a;
    else if(match.winner!==match.a&&match.winner!==match.b)match.winner=null;
  }
  return rounds;
}
export function startBracket(total){
  if(total<2)return [];
  const slots=2**Math.ceil(Math.log2(total)),matchCount=slots/2,byes=slots-total,entrants=shuffle(Array.from({length:total},(_,i)=>i));
  const first=shuffle(Array.from({length:matchCount},(_,i)=>i<matchCount-byes
    ?{a:entrants[i*2],b:entrants[i*2+1],winner:null}
    :{a:entrants[(matchCount-byes)*2+i-(matchCount-byes)],b:null,winner:entrants[(matchCount-byes)*2+i-(matchCount-byes)]}));
  return completeBracket([first]);
}
export function advanceBracket(rounds,roundIndex,matchIndex,winner){
  const match=rounds[roundIndex]?.[matchIndex];
  if(!match||match.a===null||match.b===null||![match.a,match.b].includes(winner))return false;
  match.winner=winner;completeBracket(rounds);return true;
}
export function parseDelimited(text,delimiter=','){
  const rows=[];let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(ch==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++}else quoted=!quoted}
    else if(ch===delimiter&&!quoted){row.push(field);field=''}
    else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(field);rows.push(row);row=[];field=''}
    else field+=ch;
  }
  row.push(field);rows.push(row);
  return rows.filter(r=>r.some(x=>x.trim()));
}
export const parseCsv=text=>parseDelimited(text,',');
export function namesFromRows(rows){
  const first=rows.map(r=>String(r[0]??'').trim()).filter(Boolean);
  if(/^(name|names|姓名|名字|成員|學生姓名)$/i.test(first[0]||''))first.shift();
  return first;
}
export function makeRecordSet(table,hasHeader=true,locale='zh-Hant'){
  const nameLabel=locale==='en'?'Name':'姓名',columnLabel=i=>locale==='en'?`Column ${i}`:`欄位 ${i}`;
  const rows=table.filter(row=>row.some(value=>String(value??'').trim()));
  if(!rows.length)return {columns:[nameLabel],rows:[]};
  const width=Math.max(...rows.map(row=>row.length));
  if(width===1){const values=(hasHeader?rows.slice(1):rows).map(row=>String(row[0]??'').trim()).filter(Boolean);return {columns:[hasHeader?String(rows[0][0]??'').trim()||nameLabel:columnLabel(1)],rows:values.map(value=>[value])}}
  const rawHeaders=hasHeader?rows[0].map((value,i)=>String(value??'').trim()||columnLabel(i+1)):Array.from({length:width},(_,i)=>columnLabel(i+1));
  const columns=rawHeaders.map((header,i)=>rawHeaders.slice(0,i).includes(header)?`${header} ${i+1}`:header);
  return {columns,rows:(hasHeader?rows.slice(1):rows).map(row=>Array.from({length:columns.length},(_,i)=>String(row[i]??'').trim())).filter(row=>row.some(Boolean))};
}
export function serializeTsv(columns,rows){
  const quote=value=>{const s=String(value??'');return /[\t\r\n"]/.test(s)?`"${s.replaceAll('"','""')}"`:s};
  return [columns,...rows].map(row=>row.map(quote).join('\t')).join('\n');
}
export function formatRecord(row,columns,visible){return visible.map(i=>row[i]).filter(Boolean).join(' · ')||'—'}
