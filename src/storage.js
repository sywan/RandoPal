const KEY='randopal-state-v1';
export const initialState={rosters:[
  {id:'demo',kind:'person',name:'示範名單',columns:['姓名'],rows:['小明','小華','小美','阿哲','怡君','家豪','雨欣','子晴'].map(name=>[name]),displayColumns:[0],picked:[]},
  {id:'demo-teams',kind:'team',name:'示範小組名單',columns:['組別編號','組名'],rows:Array.from({length:8},(_,i)=>[String(i+1),`第 ${i+1} 組`]),displayColumns:[0,1],picked:[]}
],selectedId:'demo',selectedTeamId:'demo-teams',soundEnabled:false};
const hasChromeStorage=typeof chrome!=='undefined'&&Boolean(chrome.storage?.local);
export async function loadState(){
  try{
    const raw=hasChromeStorage?(await chrome.storage.local.get(KEY))[KEY]:localStorage.getItem(KEY);
    const data=typeof raw==='string'?JSON.parse(raw):raw;
    if(data&&Array.isArray(data.rosters)&&data.rosters.length){
      for(const roster of data.rosters){
        if(!Array.isArray(roster.rows)){roster.rows=(roster.names||[]).map(name=>[name]);roster.columns=['姓名'];roster.displayColumns=[0];delete roster.names}
        roster.kind=roster.kind==='team'?'team':'person';
        if(!Array.isArray(roster.displayColumns)||!roster.displayColumns.length)roster.displayColumns=[0];
        if(!Array.isArray(roster.picked))roster.picked=[];
      }
      if(!data.rosters.some(roster=>roster.kind==='person'))data.rosters.unshift(structuredClone(initialState.rosters[0]));
      if(!data.rosters.some(roster=>roster.kind==='team'))data.rosters.push(structuredClone(initialState.rosters[1]));
      if(!data.rosters.some(roster=>roster.kind==='person'&&roster.id===data.selectedId))data.selectedId=data.rosters.find(roster=>roster.kind==='person').id;
      if(!data.rosters.some(roster=>roster.kind==='team'&&roster.id===data.selectedTeamId))data.selectedTeamId=data.rosters.find(roster=>roster.kind==='team').id;
      return data;
    }
  }catch(error){console.warn('Could not load saved data',error)}
  return structuredClone(initialState);
}
export async function saveState(data){
  if(hasChromeStorage)await chrome.storage.local.set({[KEY]:data});
  else localStorage.setItem(KEY,JSON.stringify(data));
}
