const KEY='randopal-state-v1';
export const initialState={rosters:[
  {id:'demo',kind:'person',name:'示範名單',columns:['姓名'],rows:['小明','小華','小美','阿哲','怡君','家豪','雨欣','子晴'].map(name=>[name]),displayColumns:[0],picked:[]},
  {id:'demo-teams',kind:'team',name:'示範小組名單',columns:['組別編號','組名'],rows:Array.from({length:8},(_,i)=>[String(i+1),`第 ${i+1} 組`]),displayColumns:[0,1],picked:[]},
  {id:'demo-tasks',kind:'task',name:'示範任務卡',columns:['任務','提示'],rows:[['用 60 秒畫出你的想法','不能使用文字'],['換個角度說明','站在另一位角色的立場'],['找出一個反例','分享它如何改變結論'],['一句話提案','說出最重要的價值'],['提出三個問題','挑出最想討論的一個'],['交換觀點','先重述對方的想法'] ],displayColumns:[0,1],picked:[]},
  {id:'demo-roles',kind:'role',name:'示範角色卡',columns:['角色'],rows:['主持人','記錄員','報告者','計時員','提問者','總結者'].map(role=>[role]),displayColumns:[0],picked:[]},
  {id:'demo-topics',kind:'task',name:'創意主題卡',columns:['主題'],rows:['未來教室','社區咖啡店','校園節能','遠距協作','城市交通','健康午餐','友善圖書館','雨天活動','新生指南','團隊儀式'].map(value=>[value]),displayColumns:[0],picked:[]},
  {id:'demo-formats',kind:'task',name:'創意形式卡',columns:['形式'],rows:['一分鐘提案','四格漫畫','無字海報','角色扮演','三句故事','簡短辯論','紙上原型','新聞標題','訪談問題','電梯簡報'].map(value=>[value]),displayColumns:[0],picked:[]},
  {id:'demo-twists',kind:'task',name:'驚喜事件卡',columns:['事件'],rows:['時間突然只剩一半','預算被砍掉三成','需要讓新手也能參與','加入一位不同立場的觀眾','必須用一張圖說明','合作對象突然改變','只能使用身邊的材料','加入一項環保限制','要在戶外完成','換一位成員擔任主講'].map(value=>[value]),displayColumns:[0],picked:[]},
  {id:'demo-bingo',kind:'task',name:'話題賓果卡',columns:['話題'],rows:['最近學到的新事物','最想去的地方','一道喜歡的食物','一個擅長的技能','最喜歡的季節','最近看過的作品','想嘗試的運動','童年的遊戲','一件值得感謝的事','喜歡的音樂','最近解決的難題','想學的語言','最有趣的課程','合作成功的經驗','一個小目標','喜歡的動物','最棒的團隊活動','最想發明的東西','一項日常習慣','喜歡的節日','最想交換的技能','最近的驚喜','一個好問題','最常用的工具','今天的心情'].map(value=>[value]),displayColumns:[0],picked:[]},
  {id:'demo-seats',kind:'seat',name:'示範座位圖',columns:['座位','狀態'],rows:Array.from({length:12},(_,i)=>[`${String.fromCharCode(65+Math.floor(i/4))}${i%4+1}`,[3,10].includes(i)?'不可用':'可用']),displayColumns:[0],picked:[]}
],selectedId:'demo',selectedTeamId:'demo-teams',selectedTaskId:'demo-tasks',selectedNormalTaskId:'demo-tasks',selectedRoleId:'demo-roles',selectedSeatId:'demo-seats',creativeDecks:{topic:'demo-topics',format:'demo-formats',twist:'demo-twists',bingo:'demo-bingo'},rotationHistory:{},seatOverrides:{},seatSessions:{},bracketSessions:{},soundEnabled:false};
const hasChromeStorage=typeof chrome!=='undefined'&&Boolean(chrome.storage?.local);
export async function loadState(){
  try{
    const raw=hasChromeStorage?(await chrome.storage.local.get(KEY))[KEY]:localStorage.getItem(KEY);
    const data=typeof raw==='string'?JSON.parse(raw):raw;
    if(data&&Array.isArray(data.rosters)&&data.rosters.length){
      for(const roster of data.rosters){
        if(!Array.isArray(roster.rows)){roster.rows=(roster.names||[]).map(name=>[name]);roster.columns=['姓名'];roster.displayColumns=[0];delete roster.names}
        roster.kind=['team','task','role','seat'].includes(roster.kind)?roster.kind:'person';
        if(!Array.isArray(roster.displayColumns)||!roster.displayColumns.length)roster.displayColumns=[0];
        if(!Array.isArray(roster.picked))roster.picked=[];
      }
      for(const sample of initialState.rosters)if(!data.rosters.some(roster=>roster.kind===sample.kind||roster.id===sample.id))data.rosters.push(structuredClone(sample));
      for(const sample of initialState.rosters.filter(roster=>['demo-topics','demo-formats','demo-twists','demo-bingo'].includes(roster.id)))if(!data.rosters.some(roster=>roster.id===sample.id))data.rosters.push(structuredClone(sample));
      for(const [kind,key] of [['person','selectedId'],['team','selectedTeamId'],['task','selectedTaskId'],['role','selectedRoleId'],['seat','selectedSeatId']]){
        if(!data.rosters.some(roster=>roster.kind===kind&&roster.id===data[key]))data[key]=data.rosters.find(roster=>roster.kind===kind).id;
      }
      if(!data.rosters.some(roster=>roster.kind==='task'&&roster.id===data.selectedNormalTaskId))data.selectedNormalTaskId=data.selectedTaskId;
      data.creativeDecks={...initialState.creativeDecks,...data.creativeDecks};
      for(const [slot,id] of Object.entries(data.creativeDecks))if(!data.rosters.some(roster=>roster.kind==='task'&&roster.id===id))data.creativeDecks[slot]=initialState.creativeDecks[slot];
      if(!data.rotationHistory||typeof data.rotationHistory!=='object'||Array.isArray(data.rotationHistory))data.rotationHistory={};
      if(!data.seatOverrides||typeof data.seatOverrides!=='object'||Array.isArray(data.seatOverrides))data.seatOverrides={};
      if(!data.seatSessions||typeof data.seatSessions!=='object'||Array.isArray(data.seatSessions))data.seatSessions={};
      if(!data.bracketSessions||typeof data.bracketSessions!=='object'||Array.isArray(data.bracketSessions))data.bracketSessions={};
      return data;
    }
  }catch(error){console.warn('Could not load saved data',error)}
  return structuredClone(initialState);
}
export async function saveState(data){
  if(hasChromeStorage)await chrome.storage.local.set({[KEY]:data});
  else localStorage.setItem(KEY,JSON.stringify(data));
}
