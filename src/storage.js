const KEY='randopal-state-v1';
export const initialState={rosters:[{id:'demo',name:'示範名單',columns:['姓名'],rows:['小明','小華','小美','阿哲','怡君','家豪','雨欣','子晴'].map(name=>[name]),displayColumns:[0],picked:[]}],selectedId:'demo',soundEnabled:false};
const hasChromeStorage=typeof chrome!=='undefined'&&Boolean(chrome.storage?.local);
export async function loadState(){
  try{
    const raw=hasChromeStorage?(await chrome.storage.local.get(KEY))[KEY]:localStorage.getItem(KEY);
    const data=typeof raw==='string'?JSON.parse(raw):raw;
    if(data&&Array.isArray(data.rosters)&&data.rosters.length){
      for(const roster of data.rosters){
        if(!Array.isArray(roster.rows)){roster.rows=(roster.names||[]).map(name=>[name]);roster.columns=['姓名'];roster.displayColumns=[0];delete roster.names}
        if(!Array.isArray(roster.displayColumns)||!roster.displayColumns.length)roster.displayColumns=[0];
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
