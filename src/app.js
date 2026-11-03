import {randomInt,shuffle,parseNames,makeGroups,parseCsv,parseDelimited,makeRecordSet,serializeTsv,formatRecord} from './core.js';
import {loadState,saveState} from './storage.js';
import {namesFromXlsx} from './xlsx.js';
import {setLanguage,getLanguage,t,translateStatic,translateImportError,uiText} from './i18n.js?v=3';

const $=id=>document.getElementById(id);
const state={data:null,page:'playground',mode:'pick',display:'slot',orderDisplay:'list',groupDisplay:'grid',orderRevealIndex:0,groupRevealIndex:0,groupMethod:'count',order:[],groups:[],running:false,editingNew:false,editorSelection:new Set([0]),editorSingleColumnName:'姓名',importTable:null,lastWinner:null};
let toastTimer;
let palTimer;
let audioContext;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const idlePal=reducedMotion?'icons/guga-pal-hd.png':'icons/guga-pal-hd.webp?v=055';
function tone(frequency,duration=.07,delay=0,volume=.035){
  if(!state.data?.soundEnabled)return;
  try{
    audioContext ||= new (window.AudioContext||window.webkitAudioContext)();
    if(audioContext.state==='suspended')audioContext.resume();
    const start=audioContext.currentTime+delay,osc=audioContext.createOscillator(),gain=audioContext.createGain();
    osc.type='sine';osc.frequency.setValueAtTime(frequency,start);
    gain.gain.setValueAtTime(.001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.01);gain.gain.exponentialRampToValueAtTime(.001,start+duration);
    osc.connect(gain).connect(audioContext.destination);osc.start(start);osc.stop(start+duration+.02);
  }catch(error){console.warn('Audio unavailable',error)}
}
function successSound(){tone(523,.12,0);tone(659,.12,.12);tone(784,.2,.24)}
function shuffleSound(){tone(392,.06,0);tone(494,.06,.07);tone(587,.07,.14)}
function renderSound(){const on=Boolean(state.data.soundEnabled);$('soundToggle').setAttribute('aria-pressed',String(on));$('soundToggle').title=t(on?'turnOffSound':'turnOnSound');$('soundToggle').querySelector('span').textContent=t(on?'soundOn':'soundOff')}
const roster=()=>state.data.rosters.find(r=>r.id===state.data.selectedId)||state.data.rosters[0];
const label=(row,r=roster())=>formatRecord(row,r.columns,r.displayColumns);
const rosterName=r=>r.id==='demo'&&r.name==='示範名單'?t('demoRoster'):r.name;
const columnName=(name,r)=>r?.id==='demo'&&name==='姓名'?t('memberName'):name;
const defaultDisplay=columns=>{const index=columns.findIndex(name=>/^(姓名|名字|name|student name)$/i.test(name));return [index<0?0:index]};
function notify(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function persist(){saveState(state.data).catch(()=>notify(t('storageError')))}
function setText(id,text){$(id).textContent=text}
function palSays(message,celebratory=false){
  setText('palMessage',message);clearTimeout(palTimer);
  $('palArt').src=celebratory&&!reducedMotion?'icons/guga-spin-hd.webp':idlePal;
  $('palArt').classList.remove('pal-pop');void $('palArt').offsetWidth;$('palArt').classList.add('pal-pop');
  if(celebratory&&!reducedMotion)palTimer=setTimeout(()=>$('palArt').src=idlePal,2550);
}
function renderRosterStudio(){
  $('studioRosterList').replaceChildren(...state.data.rosters.map(r=>{
    const card=document.createElement('article');card.className='studio-card';
    const heading=document.createElement('div');heading.className='studio-card-head';
    const title=document.createElement('h3');title.textContent=r.name;
    const badge=document.createElement('span');badge.textContent=r.id===roster().id?t('activeRoster'):t('members',{count:r.rows.length});heading.append(title,badge);
    const summary=document.createElement('p');summary.textContent=t('rosterSummary',{members:r.rows.length,columns:r.columns.length,fields:r.displayColumns.map(i=>columnName(r.columns[i],r)).join(getLanguage()==='en'?', ':'、')});
    const actions=document.createElement('div');actions.className='studio-card-actions';
    const use=document.createElement('button');use.type='button';use.className='primary-button';use.textContent=t('useInPlayground');use.addEventListener('click',()=>{selectRoster(r.id);showPage('playground')});
    const edit=document.createElement('button');edit.type='button';edit.className='secondary-button';edit.textContent=t('editRoster');edit.addEventListener('click',()=>{if(roster().id!==r.id)selectRoster(r.id);openEditor()});
    actions.append(use,edit);card.append(heading,summary,actions);return card;
  }));
}
function showPage(page){
  if(document.body.classList.contains('stage-view')||document.body.classList.contains('popup-view'))page='playground';
  state.page=page;const pages={playground:['workspace','homeLink',uiText('隨機遊樂場')],studio:['rosterStudio','rosterStudioLink',uiText('名單工作室')],ideas:['ideasLab','ideasLink',uiText('玩法靈感')]};
  for(const [key,[section,link]] of Object.entries(pages)){$(section).classList.toggle('hidden',key!==page);$(link).classList.toggle('active',key===page)}
  setText('pageName',pages[page][2]);$('openTab').classList.toggle('hidden',page!=='playground');
  if(page==='studio')renderRosterStudio();
  document.querySelector('.content').scrollTo({top:0});closeSidebarDrawer();
}
function applyPreset(preset){
  const options={warmup:['pick','slot'],wheel:['pick','wheel'],cards:['pick','cards'],present:['order','reveal'],teams:['group','reveal']};
  const [mode,display]=options[preset];showPage('playground');setMode(mode);
  if(mode==='pick')setDisplay(display);else if(mode==='order')setOrderDisplay(display);else setGroupDisplay(display);
  palSays(t(({warmup:'warmupPal',wheel:'wheelPal',cards:'cardsPal',present:'presentPal',teams:'teamsPal'})[preset]));
}
function renderContext(){
  const r=roster(),count=r.rows.length;
  ['pick','order','group'].forEach(mode=>$(mode+'Context').classList.toggle('hidden',state.mode!==mode));
  const titles={pick:['✧',uiText('抽選進度')],order:['☷',t('orderProgressTitle')],group:['♧',t('groupPlan')]};
  setText('contextIcon',titles[state.mode][0]);setText('contextTitle',titles[state.mode][1]);
  setText('orderContextNumber',state.order.length||count);
  setText('orderContextDetail',state.order.length?t('orderProgressDetail',{count:state.order.length,progress:state.orderDisplay==='reveal'?t('orderRevealed',{count:state.orderRevealIndex}):t('fullListReady')}):(uiText('產生順序後，這裡會顯示完成進度。')));
  const target=Math.max(1,Math.floor(Number($('groupNumber').value)||1));
  const planned=count?Math.min(count,state.groupMethod==='count'?target:Math.ceil(count/target)):0;
  const sizes=state.groups.length?state.groups.map(group=>group.length):Array.from({length:planned},(_,i)=>Math.floor(count/planned)+(i<count%planned?1:0));
  setText('groupContextNumber',state.groups.length||planned);
  setText('groupContextCaption',t(state.groups.length?'groupsMade':'groupsPlanned',{count:state.groups.length||planned}));
  setText('groupContextDetail',state.groups.length?t('groupProgressDetail',{count,progress:state.groupDisplay==='reveal'?t('groupsRevealed',{count:state.groupRevealIndex}):t('groupOverviewReady')}):t('groupBalance',{count}));
  $('groupSizePreview').replaceChildren(...sizes.slice(0,12).map((size,i)=>{const chip=document.createElement('span');chip.textContent=t('groupSize',{index:i+1,count:size});return chip}));
  setText('contextPalText',({pick:uiText('咕嘎陪你抽出幸運兒！'),order:t('orderPal'),group:t('groupPal')})[state.mode]);
}
function renderRosterChoices(){
  const selected=roster();
  $('rosterSelect').replaceChildren(...state.data.rosters.map(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=rosterName(r);return o}));
  $('rosterSelect').value=selected.id;
  $('rosterList').replaceChildren(...state.data.rosters.map(r=>{const b=document.createElement('button');b.type='button';b.className='roster-item'+(r.id===selected.id?' active':'');b.textContent=rosterName(r);b.addEventListener('click',()=>selectRoster(r.id));return b}));
}
function renderStats(){
  const r=roster(),remaining=r.rows.filter((_,i)=>!r.picked.includes(i));
  setText('rosterNameLabel',rosterName(r));setText('totalCount',r.rows.length);setText('remainingCount',remaining.length);setText('pickedCount',t(r.picked.length===1?'person':'people',{count:r.picked.length}));setText('countPill',t('members',{count:r.rows.length}));
  const pickedRows=r.picked.map(i=>r.rows[i]).filter(Boolean).map(row=>label(row,r));
  const chips=(document.body.classList.contains('stage-view')?pickedRows:pickedRows.slice(-9)).reverse();
  $('pickedList').replaceChildren(...(chips.length?chips.map(name=>{const s=document.createElement('span');s.textContent=name;return s}):[(()=>{const s=document.createElement('span');s.className='empty-chip';s.textContent=t('noPick');return s})()]));
  $('pickBtn').disabled=state.running||!r.rows.length;
  $('orderBtn').disabled=!r.rows.length;$('groupBtn').disabled=!r.rows.length;
  renderContext();
  if(state.display!=='wheel')drawWheel();
}
function render(){renderRosterChoices();renderStats();renderRosterStudio();drawWheel();renderSound()}
function renderLanguageSwitch(){
  $('languageSwitch').dataset.language=getLanguage();
  document.querySelectorAll('.language-option').forEach(button=>{
    const selected=button.dataset.language===getLanguage();
    button.setAttribute('aria-checked',String(selected));button.tabIndex=selected?0:-1;
  });
}
function renderLocalized(){
  translateStatic();renderLanguageSwitch();render();setMode(state.mode);updateGroupMethod(state.groupMethod);
  setText('pageName',({playground:uiText('隨機遊樂場'),studio:uiText('名單工作室'),ideas:uiText('玩法靈感')})[state.page]);
  if(state.order.length)renderOrderResult();else setText('orderResult',uiText('點擊下方按鈕產生順序'));
  if(state.groups.length)renderGroupResult();else setText('groupResult',uiText('點擊下方按鈕產生分組'));
  renderOrderReveal();renderGroupReveal();
  if(state.lastWinner){setText('slotName',state.lastWinner);setText('stageSub',t('pickedSub',{name:state.lastWinner}));setText('pickNote',t('pickedNote',{name:state.lastWinner}));setText('pickBtn',t('pickAgain'));setText('palMessage',t('pickedPal',{name:state.lastWinner}))}
  else{setText('slotName',uiText('點擊開始抽選'));setText('stageSub',uiText('每個人都有一樣的機會'));setText('pickBtn',uiText('開始抽選')+' →');setText('palMessage',uiText('嗨！選個玩法，我陪你一起玩。'))}
  if($('rosterDialog').open)updateEditorCount();updateProjectionButton();
}
function syncLanguage(data){
  if(!data||data.language===state.data.language)return;
  state.data.language=data.language;setLanguage(data.language);renderLocalized();
}
function changeLanguage(code){
  if(state.running||code===getLanguage())return;
  state.data.language=code;setLanguage(code);persist();renderLocalized();
}
function closeSidebarDrawer(){document.querySelector('.sidebar').classList.remove('open');if(matchMedia('(max-width:650px)').matches){$('menuBtn').setAttribute('aria-expanded','false');$('menuBtn').setAttribute('aria-label',t('expandSidebar'));$('menuBtn').title=t('expandSidebar')}}
function selectRoster(id){if(state.running)return;state.data.selectedId=id;state.order=[];state.groups=[];clearResults();persist();render();closeSidebarDrawer()}
function clearResults(){
  state.lastWinner=null;setText('pickBtn',uiText('開始抽選')+' →');setText('slotName',uiText('點擊開始抽選'));setText('stageSub',uiText('每個人都有一樣的機會'));setText('pickNote','');
  document.querySelectorAll('.mystery-card').forEach(card=>{card.classList.remove('selected');card.querySelector('.card-front').textContent=''});
  $('orderResult').className='result-list empty-result';$('orderResult').classList.toggle('hidden',state.orderDisplay!=='list');setText('orderResult',uiText('點擊下方按鈕產生順序'));
  $('groupResult').className='group-result empty-result';$('groupResult').classList.toggle('hidden',state.groupDisplay!=='grid');setText('groupResult',uiText('點擊下方按鈕產生分組'));
  state.orderRevealIndex=0;state.groupRevealIndex=0;renderOrderReveal();renderGroupReveal();
  for(const id of ['copyOrder','copyGroup','exportOrder','exportGroup'])$(id).disabled=true;
  renderContext();
}
function setMode(mode){state.mode=mode;document.body.classList.toggle('stage-pick',mode==='pick');document.querySelectorAll('.mode-tab').forEach(b=>{const on=b.dataset.mode===mode;b.classList.toggle('active',on);b.setAttribute('aria-selected',on)});['pick','order','group'].forEach(m=>$(m+'Panel').classList.toggle('hidden',m!==mode));const titles={pick:['LUCKY PICK',t('pickTitle')],order:['RANDOM ORDER',t('orderTitle')],group:['TEAM MAKER',t('groupTitle')]};setText('cardKicker',titles[mode][0]);setText('cardTitle',titles[mode][1]);renderContext()}
function setDisplay(display){if(state.running)return;state.display=display;document.querySelectorAll('[data-display]').forEach(b=>b.classList.toggle('selected',b.dataset.display===display));$('slotStage').classList.toggle('hidden',display!=='slot');$('wheelStage').classList.toggle('hidden',display!=='wheel');$('cardStage').classList.toggle('hidden',display!=='cards');drawWheel()}
function setOrderDisplay(display){state.orderDisplay=display;document.querySelectorAll('[data-order-display]').forEach(b=>b.classList.toggle('selected',b.dataset.orderDisplay===display));$('orderResult').classList.toggle('hidden',display!=='list');$('orderReveal').classList.toggle('hidden',display!=='reveal');renderOrderReveal();renderContext()}
function setGroupDisplay(display){state.groupDisplay=display;document.querySelectorAll('[data-group-display]').forEach(b=>b.classList.toggle('selected',b.dataset.groupDisplay===display));$('groupResult').classList.toggle('hidden',display!=='grid');$('groupReveal').classList.toggle('hidden',display!=='reveal');renderGroupReveal();renderContext()}
function animateReveal(id){const card=$(id);card.classList.remove('revealed');void card.offsetWidth;card.classList.add('revealed')}
function renderOrderReveal(){
  const total=state.order.length,index=state.orderRevealIndex;
  $('revealOrderBtn').disabled=!total||index>=total;
  setText('orderProgress',total?t('orderRevealProgress',{done:Math.min(index,total),total}):(uiText('尚未產生順序')));
  if(!total){setText('orderRevealNumber','?');setText('orderRevealName',uiText('產生順序後，點擊揭曉'));setText('orderRevealHint',uiText('每次揭曉一位'))}
  else if(index===0){setText('orderRevealNumber','READY');setText('orderRevealName',t('orderRevealFirst'));setText('orderRevealHint',t('orderReady'))}
  else{setText('orderRevealNumber',t('rank',{index}));setText('orderRevealName',label(state.order[index-1]));setText('orderRevealHint',index<total?t('revealNextPerson'):t('allRevealed'))}
}
function revealOrder(){if(state.orderRevealIndex>=state.order.length)return;state.orderRevealIndex++;renderOrderReveal();renderContext();animateReveal('revealOrderBtn');tone(523,.09);tone(659,.12,.1)}
function renderGroupReveal(){
  const total=state.groups.length,index=state.groupRevealIndex;
  $('revealGroupBtn').disabled=!total||index>=total;
  setText('groupProgress',total?t('groupRevealProgress',{done:Math.min(index,total),total}):(uiText('尚未產生分組')));
  if(!total){setText('groupRevealNumber','?');setText('groupRevealName',uiText('產生分組後，點擊揭曉'));setText('groupRevealMembers',uiText('每次揭曉一組'))}
  else if(index===0){setText('groupRevealNumber','READY');setText('groupRevealName',t('groupRevealFirst'));setText('groupRevealMembers',t('groupsReady'))}
  else{setText('groupRevealNumber',t('groupNumber',{index}));setText('groupRevealName',t('groupCard',{index,count:state.groups[index-1].length}));setText('groupRevealMembers',state.groups[index-1].map(row=>label(row)).join(getLanguage()==='en'?', ':'、'))}
}
function revealGroup(){if(state.groupRevealIndex>=state.groups.length)return;state.groupRevealIndex++;renderGroupReveal();renderContext();animateReveal('revealGroupBtn');tone(523,.09);tone(659,.12,.1)}
function drawWheel(){
  const canvas=$('wheelCanvas'),ctx=canvas.getContext('2d'),r=roster();if(!ctx)return;
  const names=r.rows.filter((_,i)=>!$('excludePicked').checked||!r.picked.includes(i)).map(row=>label(row,r));
  const list=names.length?names:[t('emptyRoster')];const colors=['#72b9ee','#90d0f4','#b0ddf8','#a7cff0','#7daee5','#91c8ed'];
  const size=Math.max(32,Math.round(canvas.clientWidth)||380),dpr=Math.min(window.devicePixelRatio||1,2),center=size/2,radius=center-5;
  canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.translate(center,center);
  const slice=2*Math.PI/list.length,textRadius=radius*.66,fontSize=list.length<=10?Math.min(23,Math.max(17,size*.055)):list.length<=18?Math.min(18,Math.max(14,size*.044)):14;
  list.forEach((name,i)=>{
    const start=-Math.PI/2+i*slice,end=start+slice,angle=start+slice/2;
    ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,radius,start,end);ctx.closePath();ctx.fillStyle=colors[i%colors.length];ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2.5;ctx.stroke();
    const text=list.length>20?String(i+1):name.length>8?name.slice(0,7)+'…':name;
    const maxWidth=Math.max(22,2*textRadius*Math.sin(slice/2)*.9);
    ctx.fillStyle='#173d75';ctx.font=`700 ${fontSize}px "Noto Sans TC","PingFang TC",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(text,Math.cos(angle)*textRadius,Math.sin(angle)*textRadius,maxWidth);
  });
}
function celebrate(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const stage=state.display==='wheel'?$('wheelStage'):state.display==='cards'?$('cardStage'):$('slotStage');for(let i=0;i<20;i++){const bit=document.createElement('span');bit.className='confetti';bit.style.left=`${35+randomInt(30)}%`;bit.style.top='45%';bit.style.background=['#5dabeb','#ffd675','#9ed7bc','#f99bb4'][i%4];bit.style.setProperty('--x',`${randomInt(300)-150}px`);bit.style.setProperty('--y',`${randomInt(220)-80}px`);stage.append(bit);setTimeout(()=>bit.remove(),1000)}}
function pick(cardIndex=null){
  if(state.running)return;const r=roster(),exclude=$('excludePicked').checked;let pool=r.rows.map((_,i)=>i).filter(i=>!exclude||!r.picked.includes(i));
  if(!pool.length){notify(t('roundComplete'));return}
  if(state.display==='wheel')drawWheel();
  const winnerIndex=pool[randomInt(pool.length)],winner=label(r.rows[winnerIndex],r);state.running=true;$('pickBtn').disabled=true;setText('pickNote',t('picking'));
  const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:2200;
  shuffleSound();
  if(state.display==='slot'){
    let step=0;const timer=setInterval(()=>{setText('slotName',label(r.rows[pool[randomInt(pool.length)]],r));if(step++%4===0)tone(420+randomInt(5)*45,.035)},65);
    setTimeout(()=>{clearInterval(timer);finishPick(r,winner,winnerIndex,exclude)},duration);
  }else if(state.display==='wheel'){
    const wheel=$('wheelCanvas');wheel.style.transition='none';wheel.style.transform='rotate(0deg)';void wheel.offsetHeight;
    const wedge=360/pool.length,target=360-(pool.indexOf(winnerIndex)+.5)*wedge;
    wheel.style.transition=`transform ${duration}ms cubic-bezier(.12,.74,.18,1)`;wheel.style.transform=`rotate(${1440+target}deg)`;
    const ticks=setInterval(()=>tone(420+randomInt(4)*50,.04),260);
    setTimeout(()=>{clearInterval(ticks);finishPick(r,winner,winnerIndex,exclude)},duration);
  }else{
    const selected=cardIndex??randomInt(3);
    document.querySelectorAll('.mystery-card').forEach(card=>{card.classList.remove('selected');card.querySelector('.card-front').textContent=''});
    const chosen=document.querySelector(`[data-card="${selected}"]`);
    setTimeout(()=>{chosen.querySelector('.card-front').textContent=winner;chosen.classList.add('selected');finishPick(r,winner,winnerIndex,exclude)},Math.min(duration,750));
  }
}
function finishPick(r,winner,index,exclude){if(exclude)r.picked.push(index);state.running=false;state.lastWinner=winner;setText('slotName',winner);setText('stageSub',t('pickedSub',{name:winner}));setText('pickNote',t('pickedNote',{name:winner}));setText('pickBtn',t('pickAgain'));persist();renderStats();palSays(t('pickedPal',{name:winner}),true);successSound();celebrate()}
function renderOrderResult(){
  const r=roster();const items=state.order.map((row,i)=>{const div=document.createElement('div');div.className='result-item';const b=document.createElement('b');b.textContent=String(i+1).padStart(2,'0');const span=document.createElement('span');span.textContent=label(row,r);div.append(b,span);return div});
  $('orderResult').className='result-list';$('orderResult').classList.toggle('hidden',state.orderDisplay!=='list');$('orderResult').replaceChildren(...items);$('copyOrder').disabled=false;$('exportOrder').disabled=false;renderOrderReveal();renderContext();
}
function generateOrder(){const r=roster();state.order=shuffle(r.rows);state.orderRevealIndex=0;shuffleSound();renderOrderResult();palSays(t('orderDonePal'),true)}
function updateGroupMethod(method){state.groupMethod=method;document.querySelectorAll('[data-group-method]').forEach(b=>b.classList.toggle('active',b.dataset.groupMethod===method));setText('groupNumberLabel',t(method==='count'?'groupCountLabel':'groupSizeLabel'));updateGroupHint()}
function updateGroupHint(){setText('groupHint',t(state.groupMethod==='count'?'groupCountHint':'groupSizeHint',{count:$('groupNumber').value}));renderContext()}
function renderGroupResult(){
  const r=roster();const cards=state.groups.map((group,i)=>{const div=document.createElement('div');div.className='group-card';const b=document.createElement('b');b.textContent=t('groupCard',{index:i+1,count:group.length});div.append(b,...group.map(row=>{const span=document.createElement('span');span.textContent=label(row,r);return span}));return div});
  $('groupResult').className='group-result';$('groupResult').classList.toggle('hidden',state.groupDisplay!=='grid');$('groupResult').replaceChildren(...cards);$('copyGroup').disabled=false;$('exportGroup').disabled=false;renderGroupReveal();renderContext();
}
function generateGroups(){const r=roster();state.groups=makeGroups(r.rows,state.groupMethod,$('groupNumber').value);state.groupRevealIndex=0;shuffleSound();renderGroupResult();palSays(t('groupDonePal',{count:state.groups.length}),true)}
function downloadCsv(filename,columns,rows){
  const safe=value=>{let text=String(value??'');if(/^[=+@-]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"'};
  const csv='\uFEFF'+[columns,...rows].map(row=>row.map(safe).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function copy(text){try{await navigator.clipboard.writeText(text);notify(t('copySuccess'))}catch{notify(t('copyError'))}}
function editorData(){
  const text=$('rosterText').value.trim();if(!text)return {columns:[t('nameColumn')],rows:[]};
  if(text.includes('\t'))return makeRecordSet(parseDelimited(text,'\t'),true,getLanguage());
  const lines=text.split(/\r?\n/).filter(Boolean);
  if(lines.length>1&&lines[0].includes(','))return makeRecordSet(parseCsv(text),true,getLanguage());
  return {columns:[state.editorSingleColumnName],rows:parseNames(text).map(name=>[name])};
}
function renderFieldChoices(columns){
  const choices=columns.map((column,i)=>{const item=document.createElement('label');item.className='field-choice';const input=document.createElement('input');input.type='checkbox';input.checked=state.editorSelection.has(i);input.addEventListener('change',()=>{if(input.checked)state.editorSelection.add(i);else state.editorSelection.delete(i)});const span=document.createElement('span');span.textContent=column;item.append(input,span);return item});
  $('fieldChoices').replaceChildren(...choices);
}
function openEditor(isNew=false){
  if(state.running)return;state.editingNew=isNew;const r=roster();$('rosterNameInput').value=isNew?t('newRoster'):r.name;
  $('rosterText').value=isNew?'':r.columns.length===1?r.rows.map(row=>row[0]).join('\n'):serializeTsv(r.columns,r.rows);
  state.editorSelection=new Set(isNew?[0]:r.displayColumns);state.editorSingleColumnName=isNew?t('nameColumn'):r.columns[0];state.importTable=null;$('firstRowHeader').checked=true;$('firstRowHeader').disabled=false;
  $('deleteRoster').hidden=isNew||state.data.rosters.length===1;updateEditorCount();$('rosterDialog').showModal();
}
function updateEditorCount(){const data=editorData();setText('editorCount',t('editorCount',{rows:data.rows.length,columns:data.columns.length}));renderFieldChoices(data.columns)}
function saveEditor(event){
  event.preventDefault();const name=$('rosterNameInput').value.trim(),data=editorData();
  if(!name){notify(t('enterRosterName'));return}if(!data.rows.length){notify(t('needRow'));return}
  const displayColumns=[...state.editorSelection].filter(i=>i<data.columns.length).sort((a,b)=>a-b);
  if(!displayColumns.length){notify(t('needDisplayColumn'));return}
  if(state.editingNew){const id=crypto.randomUUID();state.data.rosters.push({id,name,...data,displayColumns,picked:[]});state.data.selectedId=id}
  else{const r=roster();Object.assign(r,{name,...data,displayColumns,picked:[]})}
  persist();clearResults();render();$('rosterDialog').close();notify(t('rosterSaved'));
}
function deleteRoster(){if(state.data.rosters.length===1)return;state.data.rosters=state.data.rosters.filter(r=>r.id!==roster().id);state.data.selectedId=state.data.rosters[0].id;persist();clearResults();render();$('rosterDialog').close();notify(t('rosterDeleted'))}
async function importFile(file){
  if(!file)return;
  try{
    let table;const ext=file.name.split('.').pop().toLowerCase();
    if(ext==='xlsx')table=await namesFromXlsx(file);
    else if(ext==='csv')table=parseCsv((await file.text()).replace(/^\uFEFF/,''));
    else if(ext==='txt')table=parseNames(await file.text()).map(name=>[name]);
    else throw new Error(t('fileType'));
    if(!table.length)throw new Error(t('emptyFile'));
    state.importTable=table;$('firstRowHeader').disabled=ext==='txt';if(ext==='txt')$('firstRowHeader').checked=false;
    if(state.editingNew||$('rosterNameInput').value===t('newRoster'))$('rosterNameInput').value=file.name.replace(/\.[^.]+$/,'');
    applyImportPreview();
  }catch(error){notify(translateImportError(error.message)||t('importFailed'))}finally{$('importFile').value=''}
}
function applyImportPreview(){
  if(!state.importTable)return;
  const data=makeRecordSet(state.importTable,$('firstRowHeader').checked,getLanguage());
  if(!data.rows.length){$('rosterText').value='';updateEditorCount();notify(t('noDataRows'));return}
  state.editorSingleColumnName=data.columns[0];
  $('rosterText').value=data.columns.length===1?data.rows.map(row=>row[0]).join('\n'):serializeTsv(data.columns,data.rows);
  state.editorSelection=new Set(defaultDisplay(data.columns));updateEditorCount();notify(t('importPreview',{rows:data.rows.length,columns:data.columns.length}));
}
function updateProjectionButton(){const active=document.body.classList.contains('stage-view');$('openTab').firstChild.textContent=active?'↙ ':'↗ ';$('openTab').querySelector('span').textContent=active?t('backToNormal'):(uiText('投影模式'));$('openTab').title=t(active?'backToNormal':'switchProjection');$('openTab').setAttribute('aria-pressed',String(active))}
function openTab(){
  const url=new URL('index.html',location.href);
  if(document.body.classList.contains('stage-view')){
    document.body.classList.remove('stage-view');url.searchParams.delete('view');history.replaceState(null,'',url);updateProjectionButton();renderStats();requestAnimationFrame(drawWheel);return;
  }
  url.searchParams.set('view','stage');url.searchParams.set('mode',state.mode);url.searchParams.set('display',state.display);url.searchParams.set('orderDisplay',state.orderDisplay);url.searchParams.set('groupDisplay',state.groupDisplay);
  if(document.body.classList.contains('popup-view'))window.open(url.href,'_blank','noopener');
  else{document.body.classList.add('stage-view');history.replaceState(null,'',url);updateProjectionButton();renderStats();requestAnimationFrame(drawWheel)}
}
function setupSidebar(){
  const shell=document.querySelector('.app-shell'),sidebar=document.querySelector('.sidebar'),handle=$('sidebarResize'),button=$('menuBtn');
  let width=Math.max(180,Math.min(360,Number(localStorage.getItem('randopal-sidebar-width'))||244));
  const applyWidth=next=>{width=Math.max(180,Math.min(360,Math.round(next)));shell.style.setProperty('--sidebar-width',`${width}px`);handle.setAttribute('aria-valuenow',String(width));requestAnimationFrame(drawWheel)};
  applyWidth(width);
  const setCollapsed=collapsed=>{shell.classList.toggle('sidebar-collapsed',collapsed);button.setAttribute('aria-expanded',String(!collapsed));button.setAttribute('aria-label',collapsed?t('expandSidebar'):(uiText('收合側邊欄')));button.title=collapsed?t('expandSidebar'):(uiText('收合側邊欄'));button.textContent=collapsed?'☰':'☰';requestAnimationFrame(drawWheel)};
  setCollapsed(localStorage.getItem('randopal-sidebar-collapsed')==='true');
  if(matchMedia('(max-width:650px)').matches){button.setAttribute('aria-expanded','false');button.setAttribute('aria-label',t('expandSidebar'));button.title=t('expandSidebar')}
  button.addEventListener('click',()=>{
    if(matchMedia('(max-width:650px)').matches){sidebar.classList.toggle('open');const open=sidebar.classList.contains('open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?(uiText('收合側邊欄')):t('expandSidebar'));button.title=open?(uiText('收合側邊欄')):t('expandSidebar');return}
    const collapsed=!shell.classList.contains('sidebar-collapsed');setCollapsed(collapsed);localStorage.setItem('randopal-sidebar-collapsed',String(collapsed));
  });
  handle.addEventListener('pointerdown',event=>{if(shell.classList.contains('sidebar-collapsed'))return;event.preventDefault();handle.setPointerCapture(event.pointerId);handle.classList.add('dragging')});
  handle.addEventListener('pointermove',event=>{if(!handle.hasPointerCapture(event.pointerId))return;applyWidth(event.clientX)});
  handle.addEventListener('pointerup',event=>{if(!handle.hasPointerCapture(event.pointerId))return;handle.releasePointerCapture(event.pointerId);handle.classList.remove('dragging');localStorage.setItem('randopal-sidebar-width',String(width))});
  handle.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();applyWidth(event.key==='Home'?180:event.key==='End'?360:width+(event.key==='ArrowLeft'?-12:12));localStorage.setItem('randopal-sidebar-width',String(width))});
}
function bind(){
  document.querySelectorAll('.language-option').forEach(button=>button.addEventListener('click',()=>changeLanguage(button.dataset.language)));
  $('languageSwitch').addEventListener('keydown',event=>{
    const choices={ArrowLeft:'zh-Hant',ArrowUp:'zh-Hant',Home:'zh-Hant',ArrowRight:'en',ArrowDown:'en',End:'en'};
    const target=choices[event.key];if(!target)return;
    event.preventDefault();changeLanguage(target);
    document.querySelector(`.language-option[data-language="${target}"]`).focus();
  });
  document.querySelectorAll('.mode-tab').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  document.querySelectorAll('[data-display]').forEach(b=>b.addEventListener('click',()=>setDisplay(b.dataset.display)));
  document.querySelectorAll('[data-order-display]').forEach(b=>b.addEventListener('click',()=>setOrderDisplay(b.dataset.orderDisplay)));
  document.querySelectorAll('[data-group-display]').forEach(b=>b.addEventListener('click',()=>setGroupDisplay(b.dataset.groupDisplay)));
  document.querySelectorAll('[data-card]').forEach(b=>b.addEventListener('click',()=>pick(Number(b.dataset.card))));
  $('revealOrderBtn').addEventListener('click',revealOrder);$('revealGroupBtn').addEventListener('click',revealGroup);
  document.querySelectorAll('[data-group-method]').forEach(b=>b.addEventListener('click',()=>updateGroupMethod(b.dataset.groupMethod)));
  $('rosterSelect').addEventListener('change',e=>selectRoster(e.target.value));$('addRoster').addEventListener('click',()=>openEditor(true));['editRoster','editRosterAside'].forEach(id=>$(id).addEventListener('click',()=>openEditor()));$('rosterForm').addEventListener('submit',saveEditor);$('rosterText').addEventListener('input',updateEditorCount);$('closeDialog').addEventListener('click',()=>$('rosterDialog').close());$('cancelDialog').addEventListener('click',()=>$('rosterDialog').close());$('deleteRoster').addEventListener('click',deleteRoster);$('importButton').addEventListener('click',()=>$('importFile').click());$('importFile').addEventListener('change',e=>importFile(e.target.files[0]));
  $('firstRowHeader').addEventListener('change',applyImportPreview);
  $('pickBtn').addEventListener('click',()=>pick());$('excludePicked').addEventListener('change',drawWheel);$('resetPool').addEventListener('click',()=>{if(state.running)return;roster().picked=[];persist();renderStats();notify(t('resetDone'))});$('orderBtn').addEventListener('click',generateOrder);$('groupBtn').addEventListener('click',generateGroups);$('groupNumber').addEventListener('input',updateGroupHint);
  $('copyOrder').addEventListener('click',()=>copy(state.order.map((row,i)=>`${i+1}. ${label(row)}`).join('\n')));
  $('copyGroup').addEventListener('click',()=>copy(state.groups.map((group,i)=>`${t('groupNumber',{index:i+1})}\n${group.map(row=>label(row)).join(getLanguage()==='en'?', ':'、')}`).join('\n\n')));
  $('exportOrder').addEventListener('click',()=>downloadCsv(`${roster().name}-${t('orderFile')}.csv`,[t('orderColumn'),...roster().columns],state.order.map((row,i)=>[i+1,...row])));
  $('exportGroup').addEventListener('click',()=>downloadCsv(`${roster().name}-${t('groupFile')}.csv`,[t('groupColumn'),...roster().columns],state.groups.flatMap((group,i)=>group.map(row=>[i+1,...row]))));
  $('openTab').addEventListener('click',openTab);$('homeLink').addEventListener('click',()=>showPage('playground'));
  $('rosterStudioLink').addEventListener('click',()=>showPage('studio'));$('ideasLink').addEventListener('click',()=>showPage('ideas'));
  $('studioAdd').addEventListener('click',()=>openEditor(true));$('studioImport').addEventListener('click',()=>{openEditor(true);$('importFile').click()});
  document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>applyPreset(button.dataset.preset)));
  $('soundToggle').addEventListener('click',()=>{state.data.soundEnabled=!state.data.soundEnabled;persist();renderSound();if(state.data.soundEnabled)tone(659,.1)});
}
state.data=await loadState();setLanguage(state.data.language);translateStatic();bind();if(reducedMotion){$('palArt').src=idlePal;document.querySelector('.context-pal img').src=idlePal}render();const params=new URLSearchParams(location.search),view=params.get('view');setMode(['pick','order','group'].includes(params.get('mode'))?params.get('mode'):'pick');if(['slot','wheel','cards'].includes(params.get('display')))setDisplay(params.get('display'));if(['list','reveal'].includes(params.get('orderDisplay')))setOrderDisplay(params.get('orderDisplay'));if(['grid','reveal'].includes(params.get('groupDisplay')))setGroupDisplay(params.get('groupDisplay'));if(view==='stage')document.body.classList.add('stage-view');else if(view==='popup'||location.protocol==='chrome-extension:')document.body.classList.add('popup-view');setupSidebar();renderLocalized();requestAnimationFrame(drawWheel);window.addEventListener('resize',()=>requestAnimationFrame(drawWheel));window.addEventListener('storage',event=>{if(event.key==='randopal-state-v1'&&event.newValue){try{syncLanguage(JSON.parse(event.newValue))}catch{}}});if(typeof chrome!=='undefined'&&chrome.storage?.onChanged)chrome.storage.onChanged.addListener(changes=>{const data=changes['randopal-state-v1']?.newValue;if(data)syncLanguage(typeof data==='string'?JSON.parse(data):data)});
