const KEY='randopal-state-v1';
export const initialState={rosters:[
  {id:'demo',kind:'person',name:'示範名單',columns:['姓名'],rows:['小明','小華','小美','阿哲','怡君','家豪','雨欣','子晴'].map(name=>[name]),displayColumns:[0],picked:[]},
  {id:'demo-teams',kind:'team',name:'示範小組名單',columns:['組別編號','組名'],rows:Array.from({length:8},(_,i)=>[String(i+1),`第 ${i+1} 組`]),displayColumns:[0,1],picked:[]},
  {id:'demo-tasks',kind:'task',name:'示範任務卡',columns:['任務','提示'],rows:[['用 60 秒畫出你的想法','不能使用文字'],['換個角度說明','站在另一位角色的立場'],['找出一個反例','分享它如何改變結論'],['一句話提案','說出最重要的價值'],['提出三個問題','挑出最想討論的一個'],['交換觀點','先重述對方的想法'] ],displayColumns:[0,1],picked:[]},
  {id:'demo-roles',kind:'role',name:'示範角色卡',columns:['角色'],rows:['主持人','記錄員','報告者','計時員','提問者','總結者'].map(role=>[role]),displayColumns:[0],picked:[]}
],selectedId:'demo',selectedTeamId:'demo-teams',selectedTaskId:'demo-tasks',selectedRoleId:'demo-roles',soundEnabled:false};
const hasChromeStorage=typeof chrome!=='undefined'&&Boolean(chrome.storage?.local);
export async function loadState(){
  try{
    const raw=hasChromeStorage?(await chrome.storage.local.get(KEY))[KEY]:localStorage.getItem(KEY);
    const data=typeof raw==='string'?JSON.parse(raw):raw;
    if(data&&Array.isArray(data.rosters)&&data.rosters.length){
      for(const roster of data.rosters){
        if(!Array.isArray(roster.rows)){roster.rows=(roster.names||[]).map(name=>[name]);roster.columns=['姓名'];roster.displayColumns=[0];delete roster.names}
        roster.kind=['team','task','role'].includes(roster.kind)?roster.kind:'person';
        if(!Array.isArray(roster.displayColumns)||!roster.displayColumns.length)roster.displayColumns=[0];
        if(!Array.isArray(roster.picked))roster.picked=[];
      }
      for(const sample of initialState.rosters)if(!data.rosters.some(roster=>roster.kind===sample.kind))data.rosters.push(structuredClone(sample));
      for(const [kind,key] of [['person','selectedId'],['team','selectedTeamId'],['task','selectedTaskId'],['role','selectedRoleId']]){
        if(!data.rosters.some(roster=>roster.kind===kind&&roster.id===data[key]))data[key]=data.rosters.find(roster=>roster.kind===kind).id;
      }
      return data;
    }
  }catch(error){console.warn('Could not load saved data',error)}
  return structuredClone(initialState);
}
export async function saveState(data){
  if(hasChromeStorage)await chrome.storage.local.set({[KEY]:data});
  else localStorage.setItem(KEY,JSON.stringify(data));
}
