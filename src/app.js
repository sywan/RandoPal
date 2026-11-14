import {randomInt,shuffle,parseNames,makeGroups,planTeamMatches,makeTeamMatches,assignRoles,makeReviewCircuit,drawIdeaPair,makeBingoCard,parseCsv,parseDelimited,makeRecordSet,serializeTsv,formatRecord} from './core.js';
import {initialState,loadState,saveState} from './storage.js';
import {namesFromXlsx} from './xlsx.js';
import {setLanguage,getLanguage,t,translateStatic,translateImportError,uiText} from './i18n.js?v=9';

const $=id=>document.getElementById(id);
const state={data:null,page:'playground',mode:'pick',display:'slot',orderDisplay:'list',groupDisplay:'grid',pairDisplay:'grid',reviewDisplay:'grid',roleTargetKind:'person',orderRevealIndex:0,groupRevealIndex:0,pairRevealIndex:0,reviewRevealIndex:0,groupMethod:'count',pairMethod:'size',order:[],groups:[],pairings:[],taskDraws:[],rolesAssigned:[],previousRoles:[],reviewRounds:[],mixerPairs:[],twistIndices:[],bingoRows:[],bingoMarks:new Set(),running:false,editingNew:false,editorSelection:new Set([0]),editorColumnsSignature:'',editorSingleColumnName:'姓名',importTable:null,lastWinner:null};
const categories=[{id:'quick',key:'quickCategory',modes:['pick','task']},{id:'plan',key:'planCategory',modes:['order','group','role']},{id:'exchange',key:'exchangeCategory',modes:['pair','review']},{id:'creative',key:'creativeCategory',modes:['mixer','twist','bingo']}];
const activityMeta={pick:['✧','pickActivity','pickActivityHint','LUCKY PICK','pickTitle'],task:['▣','taskActivity','taskActivityHint','CHALLENGE DRAW','taskTitle'],order:['☷','orderActivity','orderActivityHint','RANDOM ORDER','orderTitle'],group:['♧','groupActivity','groupActivityHint','TEAM MAKER','groupTitle'],role:['✿','roleActivity','roleActivityHint','ROLE SHUFFLE','roleTitle'],pair:['⇄','pairActivity','pairActivityHint','TEAM MATCH','pairTitle'],review:['⟳','reviewActivity','reviewActivityHint','REVIEW CIRCUIT','reviewTitle'],mixer:['✣','mixerActivity','mixerActivityHint','IDEA MIXER','mixerTitle'],twist:['⚡','twistActivity','twistActivityHint','TWIST CARDS','twistTitleMain'],bingo:['▦','bingoActivity','bingoActivityHint','CONVERSATION BINGO','bingoTitle']};
const selectedKey={person:'selectedId',team:'selectedTeamId',task:'selectedTaskId',role:'selectedRoleId'};
let toastTimer;
let audioContext;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const idlePal=reducedMotion?'icons/guga-pal-hd.png':'icons/guga-pal-web-v056.webp?v=2';
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
const currentKind=()=>['task','mixer','twist','bingo'].includes(state.mode)?'task':state.mode==='pair'||state.mode==='review'?'team':state.mode==='role'?state.roleTargetKind:'person';
const rosterForKind=kind=>state.data.rosters.find(r=>r.kind===kind&&r.id===state.data[selectedKey[kind]])||state.data.rosters.find(r=>r.kind===kind);
const roster=()=>rosterForKind(currentKind());
const creativeSlot=mode=>({mixer:'topic',twist:'twist',bingo:'bingo'})[mode];
const creativeDeck=slot=>state.data.rosters.find(r=>r.kind==='task'&&r.id===state.data.creativeDecks[slot])||rosterForKind('task');
function renderCreativeDeckChoices(){
  for(const [id,slot] of [['mixerTopicDeck','topic'],['mixerFormatDeck','format'],['twistDeck','twist'],['bingoDeck','bingo']]){
    const select=$(id);select.replaceChildren(...state.data.rosters.filter(r=>r.kind==='task').map(r=>{const option=document.createElement('option');option.value=r.id;option.textContent=rosterName(r);return option}));select.value=creativeDeck(slot).id;
  }
}
const demoTasksEnglish=[['Sketch your idea in 60 seconds','No words allowed'],['Explain from another angle','Speak from a different role'],['Find a counterexample','Share how it changes the conclusion'],['Pitch in one sentence','State the most important value'],['Ask three questions','Choose the one worth discussing'],['Swap perspectives','Restate the other person’s idea first']];
const demoRolesEnglish=['Facilitator','Note taker','Presenter','Timekeeper','Questioner','Summarizer'];
const demoCreativeEnglish={
  'demo-topics':['Future classroom','Neighborhood café','Campus energy saving','Remote teamwork','City transport','Healthy lunch','Welcoming library','Rainy day activity','New student guide','Team ritual'],
  'demo-formats':['One-minute pitch','Four-panel comic','Wordless poster','Role play','Three-sentence story','Short debate','Paper prototype','News headline','Interview questions','Elevator pitch'],
  'demo-twists':['Time is suddenly cut in half','The budget shrinks by 30%','Beginners must be able to join','Add an audience with another view','Explain it with one image','Your partner suddenly changes','Use only materials nearby','Add an environmental constraint','Complete it outdoors','Choose a new presenter'],
  'demo-bingo':['Something new you learned','A place you want to visit','A favorite food','A skill you are good at','Your favorite season','Something you watched recently','A sport you want to try','A childhood game','Something you appreciate','Music you like','A problem you recently solved','A language you want to learn','The most interesting class','A successful collaboration','A small goal','An animal you like','Your best team activity','Something you want to invent','A daily habit','A favorite holiday','A skill you would trade','A recent surprise','A good question','A tool you use often','How you feel today']
};
function localizedRow(row,r){
  if(getLanguage()!=='en')return row;
  if(r.id==='demo-teams'&&row[1]===`第 ${row[0]} 組`)return [row[0],t('sampleTeamName',{index:row[0]}),...row.slice(2)];
  if(r.id==='demo-tasks'){const index=r.rows.indexOf(row);if(JSON.stringify(row)===JSON.stringify(initialState.rosters[2].rows[index]))return demoTasksEnglish[index]||row}
  if(r.id==='demo-roles'){const index=r.rows.indexOf(row);if(JSON.stringify(row)===JSON.stringify(initialState.rosters[3].rows[index]))return [demoRolesEnglish[index],...row.slice(1)]}
  if(demoCreativeEnglish[r.id]){const index=r.rows.indexOf(row),sample=initialState.rosters.find(item=>item.id===r.id);if(index>=0&&JSON.stringify(row)===JSON.stringify(sample?.rows[index]))return [demoCreativeEnglish[r.id][index],...row.slice(1)]}
  return row;
}
const label=(row,r=roster())=>formatRecord(localizedRow(row,r),r.columns,r.displayColumns);
const creativeRows=slot=>{const deck=creativeDeck(slot);return [...new Map(deck.rows.map(row=>[label(row,deck),row])).values()]};
const bingoPool=()=>creativeRows('bingo');
const sampleNameKeys={demo:'demoRoster','demo-teams':'demoTeamRoster','demo-tasks':'demoTaskRoster','demo-roles':'demoRoleRoster','demo-topics':'demoTopics','demo-formats':'demoFormats','demo-twists':'demoTwists','demo-bingo':'demoBingo'};
const rosterName=r=>sampleNameKeys[r.id]&&r.name===initialState.rosters.find(item=>item.id===r.id)?.name?t(sampleNameKeys[r.id]):r.name;
const columnName=(name,r)=>r?.id==='demo'&&name==='姓名'?t('memberName'):r?.id==='demo-teams'&&name==='組別編號'?t('teamIdColumn'):r?.id==='demo-teams'&&name==='組名'?t('teamNameColumn'):r?.id==='demo-tasks'&&name==='任務'?t('taskColumn'):r?.id==='demo-tasks'&&name==='提示'?t('taskHintColumn'):r?.id==='demo-roles'&&name==='角色'?t('roleColumn'):r?.id==='demo-topics'&&name==='主題'?t('topicColumn'):r?.id==='demo-formats'&&name==='形式'?t('formatColumn'):r?.id==='demo-twists'&&name==='事件'?t('eventColumn'):r?.id==='demo-bingo'&&name==='話題'?t('promptColumn'):name;
const defaultDisplay=(columns,kind='person')=>{
  if(kind==='team'){
    const id=columns.findIndex(name=>/^(組別編號|組號|小組編號|team number|group number|team id|group id)$/i.test(name));
    const name=columns.findIndex(value=>/^(組名|小組名稱|隊名|team name|group name|name)$/i.test(value));
    return [...new Set([id,name].filter(i=>i>=0))].length?[...new Set([id,name].filter(i=>i>=0))]:columns.length>1?[0,1]:[0];
  }
  if(kind==='task'||kind==='role'){
    const pattern=kind==='task'?/^(任務|題目|挑戰|task|challenge|prompt)$/i:/^(角色|職責|role)$/i;
    const index=columns.findIndex(name=>pattern.test(name));return [index<0?0:index];
  }
  const index=columns.findIndex(name=>/^(姓名|名字|name|student name)$/i.test(name));return [index<0?0:index]
};
function notify(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function persist(){saveState(state.data).catch(()=>notify(t('storageError')))}
function setText(id,text){$(id).textContent=text}
function palSays(message){
  setText('palMessage',message);
  $('palArt').src=idlePal;
  $('palArt').classList.remove('pal-pop');void $('palArt').offsetWidth;$('palArt').classList.add('pal-pop');
}
function renderActivityBrowser(){
  const activeCategory=categories.find(category=>category.modes.includes(state.mode));
  setText('activityCount',t('activityCount',{count:Object.keys(activityMeta).length}));
  $('activityCategories').replaceChildren(...categories.map(category=>{
    const button=document.createElement('button');button.type='button';button.className='activity-category'+(category===activeCategory?' active':'');button.setAttribute('role','tab');button.setAttribute('aria-selected',String(category===activeCategory));button.textContent=`${t(category.key)}  ${category.modes.length}`;button.addEventListener('click',()=>setMode(category.modes[0]));return button;
  }));
  $('activityChoices').replaceChildren(...activeCategory.modes.map(mode=>{
    const [icon,title,hint]=activityMeta[mode],button=document.createElement('button');button.type='button';button.className='activity-choice'+(mode===state.mode?' active':'');button.setAttribute('role','tab');button.setAttribute('aria-selected',String(mode===state.mode));button.dataset.mode=mode;
    const symbol=document.createElement('span');symbol.className='activity-choice-icon';symbol.textContent=icon;
    const words=document.createElement('span');const strong=document.createElement('strong');strong.textContent=t(title);const small=document.createElement('small');small.textContent=t(hint);words.append(strong,small);button.append(symbol,words);button.addEventListener('click',()=>setMode(mode));return button;
  }));
}
function renderRosterStudio(){
  $('studioRosterList').replaceChildren(...state.data.rosters.map(r=>{
    const card=document.createElement('article');card.className='studio-card';
    const heading=document.createElement('div');heading.className='studio-card-head';
    const title=document.createElement('h3');title.textContent=rosterName(r);
    const badge=document.createElement('span');badge.textContent=r.id===roster().id?t('activeRoster'):t(({person:'members',team:'teams',task:'tasks',role:'roles'})[r.kind],{count:r.rows.length});heading.append(title,badge);
    const summary=document.createElement('p');summary.textContent=t(({person:'rosterSummary',team:'teamRosterSummary',task:'taskRosterSummary',role:'roleRosterSummary'})[r.kind],{members:r.rows.length,columns:r.columns.length,fields:r.displayColumns.map(i=>columnName(r.columns[i],r)).join(getLanguage()==='en'?', ':'、')});
    const actions=document.createElement('div');actions.className='studio-card-actions';
    const use=document.createElement('button');use.type='button';use.className='primary-button';use.textContent=t('useInPlayground');use.addEventListener('click',()=>{selectRoster(r.id);showPage('playground')});
    const edit=document.createElement('button');edit.type='button';edit.className='secondary-button';edit.textContent=t('editRoster');edit.addEventListener('click',()=>{if(rosterForKind(r.kind).id!==r.id)selectRoster(r.id);openEditor(false,r.kind)});
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
  const options={warmup:['pick','slot'],wheel:['pick','wheel'],cards:['pick','cards'],present:['order','reveal'],teams:['group','reveal'],peer:['pair','reveal'],challenge:['task',null],roles:['role',null],circuit:['review','reveal'],mixer:['mixer',null],twist:['twist',null],bingo:['bingo',null]};
  const [mode,display]=options[preset];showPage('playground');setMode(mode);
  if(mode==='pick')setDisplay(display);else if(mode==='order')setOrderDisplay(display);else if(mode==='group')setGroupDisplay(display);else if(mode==='pair')setPairDisplay(display);else if(mode==='review')setReviewDisplay(display);
  palSays(t(({warmup:'warmupPal',wheel:'wheelPal',cards:'cardsPal',present:'presentPal',teams:'teamsPal',peer:'peerPal',challenge:'challengePal',roles:'rolesPal',circuit:'circuitPal',mixer:'mixerPal',twist:'twistPal',bingo:'bingoPal'})[preset]));
}
function renderContext(){
  const r=roster(),count=r.rows.length;
  ['pick','order','group','pair'].forEach(mode=>$(mode+'Context').classList.toggle('hidden',state.mode!==mode));
  $('extraContext').classList.toggle('hidden',!['task','role','review','mixer','twist','bingo'].includes(state.mode));
  const titles={pick:['✧',uiText('抽選進度')],order:['☷',t('orderProgressTitle')],group:['♧',t('groupPlan')],pair:['⇄',t('pairPlan')],task:['▣',t('taskPlan')],role:['✿',t('rolePlan')],review:['⟳',t('reviewPlan')],mixer:['✣',t('mixerActivity')],twist:['⚡',t('twistActivity')],bingo:['▦',t('bingoActivity')]};
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
  const plan=planTeamMatches(count,state.pairMethod,$('pairNumber').value),pairSizes=state.pairings.length?state.pairings.map(match=>match.length):plan.sizes;
  setText('pairContextNumber',state.pairings.length||plan.count);
  setText('pairContextCaption',pairText(state.pairings.length?'pairsMade':'pairsPlanned',state.pairings.length||plan.count));
  setText('pairContextDetail',count<2?t('needTwoTeams'):state.pairings.length?t('pairProgressDetail',{count,progress:state.pairDisplay==='reveal'?pairText('pairsRevealed',state.pairRevealIndex):t('pairOverviewReady')}):pairText('pairPlanHint',plan.count,{min:Math.min(...plan.sizes),max:Math.max(...plan.sizes)}));
  $('pairSizePreview').replaceChildren(...pairSizes.slice(0,12).map((size,i)=>{const chip=document.createElement('span');chip.textContent=t('pairSize',{index:i+1,count:size});return chip}));
  if(state.mode==='task'){
    const left=$('taskNoRepeat').checked?count-r.picked.length:count;
    setText('extraContextNumber',left);setText('extraContextCaption',t('taskLeft',{count:left}));setText('extraContextDetail',state.taskDraws.length?t('taskDone',{count:state.taskDraws.length}):t('taskHint'));
  }else if(state.mode==='role'){
    const roles=rosterForKind('role').rows.length,assigned=state.rolesAssigned.length;
    setText('extraContextNumber',assigned||Math.min(count,roles));setText('extraContextCaption',assigned?t('roleDone',{count:assigned}):t('rolePlan'));
    setText('extraContextDetail',t('roleReady',{roles,targets:count}));
  }else if(state.mode==='review'){
    const rounds=state.reviewRounds.length||Math.min(Math.max(1,Math.floor(Number($('reviewRounds').value)||1)),Math.max(0,count-1));
    setText('extraContextNumber',rounds);setText('extraContextCaption',state.reviewRounds.length?t('reviewDone',{rounds}):t('reviewPlan'));
    setText('extraContextDetail',t('reviewReady',{rounds,teams:count}));
  }else if(state.mode==='mixer'){
    const total=creativeRows('topic').length*creativeRows('format').length-(creativeDeck('topic').id===creativeDeck('format').id?creativeRows('topic').length:0);
    setText('extraContextNumber',Math.max(0,total-state.mixerPairs.length));setText('extraContextCaption',t('mixerRemaining'));setText('extraContextDetail',t('mixerUsed',{count:state.mixerPairs.length}));
  }else if(state.mode==='twist'){
    setText('extraContextNumber',Math.max(0,creativeRows('twist').length-state.twistIndices.length));setText('extraContextCaption',t('twistRemaining'));setText('extraContextDetail',t('twistUsed',{count:state.twistIndices.length}));
  }else if(state.mode==='bingo'){
    setText('extraContextNumber',state.bingoMarks.size);setText('extraContextCaption',t('bingoMarked'));setText('extraContextDetail',t('bingoCardCount',{count:state.bingoRows.length}));
  }
  setText('contextPalText',({pick:uiText('咕嘎陪你抽出幸運兒！'),order:t('orderPal'),group:t('groupPal'),pair:t('pairPal'),task:t('taskPal'),role:t('rolePal'),review:t('reviewPal'),mixer:t('mixerPal'),twist:t('twistPal'),bingo:t('bingoPal')})[state.mode]);
}
function renderRosterChoices(){
  const selected=roster();
  $('rosterSelect').replaceChildren(...state.data.rosters.filter(r=>r.kind===currentKind()).map(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=rosterName(r);return o}));
  $('rosterSelect').value=selected.id;
  $('rosterList').replaceChildren(...state.data.rosters.filter(r=>!['demo-topics','demo-formats','demo-twists','demo-bingo'].includes(r.id)||r.id===selected.id).map(r=>{const b=document.createElement('button');b.type='button';b.className='roster-item'+(r.id===selected.id?' active':'');b.textContent=({person:'',team:'⇄ ',task:'▣ ',role:'✿ '})[r.kind]+rosterName(r);b.addEventListener('click',()=>selectRoster(r.id));return b}));
  $('roleDeckSelect').replaceChildren(...state.data.rosters.filter(r=>r.kind==='role').map(r=>{const option=document.createElement('option');option.value=r.id;option.textContent=rosterName(r);return option}));
  $('roleDeckSelect').value=rosterForKind('role').id;$('roleTargetKind').value=state.roleTargetKind;
  renderCreativeDeckChoices();
}
function renderStats(){
  const r=roster(),remaining=r.rows.filter((_,i)=>!r.picked.includes(i));
  setText('rosterNameLabel',rosterName(r));setText('totalCount',r.rows.length);setText('remainingCount',remaining.length);setText('pickedCount',t(r.picked.length===1?'person':'people',{count:r.picked.length}));setText('countPill',t(({person:'members',team:'teams',task:'tasks',role:'roles'})[r.kind],{count:r.rows.length}));
  const pickedRows=r.picked.map(i=>r.rows[i]).filter(Boolean).map(row=>label(row,r));
  const chips=(document.body.classList.contains('stage-view')?pickedRows:pickedRows.slice(-9)).reverse();
  $('pickedList').replaceChildren(...(chips.length?chips.map(name=>{const s=document.createElement('span');s.textContent=name;return s}):[(()=>{const s=document.createElement('span');s.className='empty-chip';s.textContent=t('noPick');return s})()]));
  $('pickBtn').disabled=state.running||!r.rows.length;
  $('orderBtn').disabled=!rosterForKind('person').rows.length;$('groupBtn').disabled=!rosterForKind('person').rows.length;$('pairBtn').disabled=rosterForKind('team').rows.length<2;
  $('taskBtn').disabled=!rosterForKind('task').rows.length;$('roleBtn').disabled=!r.rows.length||!rosterForKind('role').rows.length;$('reviewBtn').disabled=rosterForKind('team').rows.length<2;
  $('mixerBtn').disabled=!creativeRows('topic').length||!creativeRows('format').length||creativeDeck('topic').id===creativeDeck('format').id&&creativeRows('topic').length<2;
  $('twistBtn').disabled=!creativeRows('twist').length;
  const bingoNeed=Number($('bingoSize').value)**2;$('bingoBtn').disabled=bingoPool().length<bingoNeed;setText('bingoHint',t('bingoNeed',{count:bingoNeed,available:bingoPool().length}));
  setText('roleHint',t('roleHint',{roles:Math.min(rosterForKind('role').rows.length,r.rows.length),targets:r.rows.length}));
  const maxReviewRounds=Math.max(1,rosterForKind('team').rows.length-1);$('reviewRounds').max=String(maxReviewRounds);
  if(Number($('reviewRounds').value)>maxReviewRounds)$('reviewRounds').value=String(maxReviewRounds);
  setText('reviewHint',t('reviewHint',{count:Math.max(0,rosterForKind('team').rows.length-1)}));
  updatePairHint();
  if(state.display!=='wheel')drawWheel();
}
function render(){renderRosterChoices();renderStats();renderRosterStudio();renderActivityBrowser();renderTaskResult();renderRoleResult();renderReviewResult();renderMixerResult();renderTwistResult();renderBingoResult();drawWheel();renderSound()}
function renderLanguageSwitch(){
  $('languageSwitch').dataset.language=getLanguage();
  document.querySelectorAll('.language-option').forEach(button=>{
    const selected=button.dataset.language===getLanguage();
    button.setAttribute('aria-checked',String(selected));button.tabIndex=selected?0:-1;
  });
}
function renderLocalized(){
  translateStatic();renderLanguageSwitch();render();setMode(state.mode);updateGroupMethod(state.groupMethod);updatePairMethod(state.pairMethod);
  setText('pageName',({playground:uiText('隨機遊樂場'),studio:uiText('名單工作室'),ideas:uiText('玩法靈感')})[state.page]);
  if(state.order.length)renderOrderResult();else setText('orderResult',uiText('點擊下方按鈕產生順序'));
  if(state.groups.length)renderGroupResult();else setText('groupResult',uiText('點擊下方按鈕產生分組'));
  if(state.pairings.length)renderPairResult();else setText('pairResult',uiText('點擊下方按鈕產生配對'));
  renderOrderReveal();renderGroupReveal();renderPairReveal();renderTaskResult();renderRoleResult();renderReviewResult();renderMixerResult();renderTwistResult();renderBingoResult();
  if(state.lastWinner){setText('slotName',state.lastWinner);setText('stageSub',t('pickedSub',{name:state.lastWinner}));setText('pickNote',t('pickedNote',{name:state.lastWinner}));setText('pickBtn',t('pickAgain'));setText('palMessage',t('pickedPal',{name:state.lastWinner}))}
  else{setText('slotName',uiText('點擊開始抽選'));setText('stageSub',uiText('每個人都有一樣的機會'));setText('pickBtn',uiText('開始抽選')+' →');setText('palMessage',uiText('嗨！選個玩法，我陪你一起玩。'))}
  if($('rosterDialog').open){updateEditorCount();renderEditorKind()}updateProjectionButton();
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
function selectRoster(id){
  if(state.running)return;
  const selected=state.data.rosters.find(r=>r.id===id);if(!selected)return;
  state.data[selectedKey[selected.kind]]=id;
  if(selected.kind==='task'&&creativeSlot(state.mode))state.data.creativeDecks[creativeSlot(state.mode)]=id;
  else if(selected.kind==='task')state.data.selectedNormalTaskId=id;
  if(selected.kind==='role')setMode('role');
  else if(state.mode==='role'&&['person','team'].includes(selected.kind)){state.roleTargetKind=selected.kind;setMode('role')}
  else if(selected.kind!==currentKind())setMode(({person:'group',team:'pair',task:'task'})[selected.kind]);
  clearResults();persist();render();closeSidebarDrawer();
}
function clearResults(){
  state.order=[];state.groups=[];state.pairings=[];state.taskDraws=[];state.rolesAssigned=[];state.previousRoles=[];state.reviewRounds=[];state.mixerPairs=[];state.twistIndices=[];state.bingoRows=[];state.bingoMarks.clear();
  state.lastWinner=null;setText('pickBtn',uiText('開始抽選')+' →');setText('slotName',uiText('點擊開始抽選'));setText('stageSub',uiText('每個人都有一樣的機會'));setText('pickNote','');
  document.querySelectorAll('.mystery-card').forEach(card=>{card.classList.remove('selected');card.querySelector('.card-front').textContent=''});
  $('orderResult').className='result-list empty-result';$('orderResult').classList.toggle('hidden',state.orderDisplay!=='list');setText('orderResult',uiText('點擊下方按鈕產生順序'));
  $('groupResult').className='group-result empty-result';$('groupResult').classList.toggle('hidden',state.groupDisplay!=='grid');setText('groupResult',uiText('點擊下方按鈕產生分組'));
  $('pairResult').className='group-result empty-result';$('pairResult').classList.toggle('hidden',state.pairDisplay!=='grid');setText('pairResult',uiText('點擊下方按鈕產生配對'));
  state.orderRevealIndex=0;state.groupRevealIndex=0;state.pairRevealIndex=0;state.reviewRevealIndex=0;renderOrderReveal();renderGroupReveal();renderPairReveal();renderTaskResult();renderRoleResult();renderReviewResult();renderMixerResult();renderTwistResult();renderBingoResult();
  for(const id of ['copyOrder','copyGroup','copyPair','copyTask','copyRole','copyReview','copyMixer','copyTwist','exportOrder','exportGroup','exportPair','exportTask','exportRole','exportReview','exportMixer','exportTwist','exportBingo','printBingo'])$(id).disabled=true;
  renderContext();
}
function setMode(mode){if(state.mode==='task'&&mode!=='task')state.data.selectedNormalTaskId=state.data.selectedTaskId;state.mode=mode;const slot=creativeSlot(mode);if(slot)state.data.selectedTaskId=creativeDeck(slot).id;else if(mode==='task')state.data.selectedTaskId=state.data.selectedNormalTaskId;document.body.classList.toggle('stage-pick',mode==='pick');for(const key of Object.keys(activityMeta))$(key+'Panel').classList.toggle('hidden',key!==mode);setText('cardKicker',activityMeta[mode][3]);setText('cardTitle',t(activityMeta[mode][4]));renderActivityBrowser();renderRosterChoices();renderStats();renderRosterStudio();renderContext()}
function setDisplay(display){if(state.running)return;state.display=display;document.querySelectorAll('[data-display]').forEach(b=>b.classList.toggle('selected',b.dataset.display===display));$('slotStage').classList.toggle('hidden',display!=='slot');$('wheelStage').classList.toggle('hidden',display!=='wheel');$('cardStage').classList.toggle('hidden',display!=='cards');drawWheel()}
function setOrderDisplay(display){state.orderDisplay=display;document.querySelectorAll('[data-order-display]').forEach(b=>b.classList.toggle('selected',b.dataset.orderDisplay===display));$('orderResult').classList.toggle('hidden',display!=='list');$('orderReveal').classList.toggle('hidden',display!=='reveal');renderOrderReveal();renderContext()}
function setGroupDisplay(display){state.groupDisplay=display;document.querySelectorAll('[data-group-display]').forEach(b=>b.classList.toggle('selected',b.dataset.groupDisplay===display));$('groupResult').classList.toggle('hidden',display!=='grid');$('groupReveal').classList.toggle('hidden',display!=='reveal');renderGroupReveal();renderContext()}
function setPairDisplay(display){state.pairDisplay=display;document.querySelectorAll('[data-pair-display]').forEach(b=>b.classList.toggle('selected',b.dataset.pairDisplay===display));$('pairResult').classList.toggle('hidden',display!=='grid');$('pairReveal').classList.toggle('hidden',display!=='reveal');renderPairReveal();renderContext()}
function animateReveal(id){const card=$(id);card.classList.remove('revealed');void card.offsetWidth;card.classList.add('revealed')}
function renderOrderReveal(){
  const total=state.order.length,index=state.orderRevealIndex;
  $('revealOrderBtn').disabled=!total||index>=total;
  setText('orderProgress',total?t('orderRevealProgress',{done:Math.min(index,total),total}):(uiText('尚未產生順序')));
  if(!total){setText('orderRevealNumber','?');setText('orderRevealName',uiText('產生順序後，點擊揭曉'));setText('orderRevealHint',uiText('每次揭曉一位'))}
  else if(index===0){setText('orderRevealNumber','READY');setText('orderRevealName',t('orderRevealFirst'));setText('orderRevealHint',t('orderReady'))}
  else{setText('orderRevealNumber',t('rank',{index}));setText('orderRevealName',label(state.order[index-1],rosterForKind('person')));setText('orderRevealHint',index<total?t('revealNextPerson'):t('allRevealed'))}
}
function revealOrder(){if(state.orderRevealIndex>=state.order.length)return;state.orderRevealIndex++;renderOrderReveal();renderContext();animateReveal('revealOrderBtn');tone(523,.09);tone(659,.12,.1)}
function renderGroupReveal(){
  const total=state.groups.length,index=state.groupRevealIndex;
  $('revealGroupBtn').disabled=!total||index>=total;
  setText('groupProgress',total?t('groupRevealProgress',{done:Math.min(index,total),total}):(uiText('尚未產生分組')));
  if(!total){setText('groupRevealNumber','?');setText('groupRevealName',uiText('產生分組後，點擊揭曉'));setText('groupRevealMembers',uiText('每次揭曉一組'))}
  else if(index===0){setText('groupRevealNumber','READY');setText('groupRevealName',t('groupRevealFirst'));setText('groupRevealMembers',t('groupsReady'))}
  else{setText('groupRevealNumber',t('groupNumber',{index}));setText('groupRevealName',t('groupCard',{index,count:state.groups[index-1].length}));setText('groupRevealMembers',state.groups[index-1].map(row=>label(row,rosterForKind('person'))).join(getLanguage()==='en'?', ':'、'))}
}
function revealGroup(){if(state.groupRevealIndex>=state.groups.length)return;state.groupRevealIndex++;renderGroupReveal();renderContext();animateReveal('revealGroupBtn');tone(523,.09);tone(659,.12,.1)}
function renderPairReveal(){
  const total=state.pairings.length,index=state.pairRevealIndex;
  $('revealPairBtn').disabled=!total||index>=total;
  setText('pairProgress',total?pairText('pairRevealProgress',total,{done:Math.min(index,total),total}):uiText('尚未產生配對'));
  if(!total){setText('pairRevealNumber','?');setText('pairRevealName',uiText('產生配對後，點擊揭曉'));setText('pairRevealTeams',uiText('每次揭曉一對'))}
  else if(index===0){setText('pairRevealNumber','READY');setText('pairRevealName',t('pairRevealFirst'));setText('pairRevealTeams',t('pairsReady'))}
  else{setText('pairRevealNumber',t('pairNumber',{index}));setText('pairRevealName',t('pairCard',{index,count:state.pairings[index-1].length}));setText('pairRevealTeams',state.pairings[index-1].map(row=>label(row,rosterForKind('team'))).join(getLanguage()==='en'?', ':'、'))}
}
function revealPair(){if(state.pairRevealIndex>=state.pairings.length)return;state.pairRevealIndex++;renderPairReveal();renderContext();animateReveal('revealPairBtn');tone(523,.09);tone(659,.12,.1)}
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
function finishPick(r,winner,index,exclude){if(exclude)r.picked.push(index);state.running=false;state.lastWinner=winner;setText('slotName',winner);setText('stageSub',t('pickedSub',{name:winner}));setText('pickNote',t('pickedNote',{name:winner}));setText('pickBtn',t('pickAgain'));persist();renderStats();palSays(t('pickedPal',{name:winner}));successSound();celebrate()}
function renderOrderResult(){
  const r=rosterForKind('person');const items=state.order.map((row,i)=>{const div=document.createElement('div');div.className='result-item';const b=document.createElement('b');b.textContent=String(i+1).padStart(2,'0');const span=document.createElement('span');span.textContent=label(row,r);div.append(b,span);return div});
  $('orderResult').className='result-list';$('orderResult').classList.toggle('hidden',state.orderDisplay!=='list');$('orderResult').replaceChildren(...items);$('copyOrder').disabled=false;$('exportOrder').disabled=false;renderOrderReveal();renderContext();
}
function generateOrder(){const r=roster();state.order=shuffle(r.rows);state.orderRevealIndex=0;shuffleSound();renderOrderResult();palSays(t('orderDonePal'))}
function updateGroupMethod(method){state.groupMethod=method;document.querySelectorAll('[data-group-method]').forEach(b=>b.classList.toggle('active',b.dataset.groupMethod===method));setText('groupNumberLabel',t(method==='count'?'groupCountLabel':'groupSizeLabel'));updateGroupHint()}
function updateGroupHint(){setText('groupHint',t(state.groupMethod==='count'?'groupCountHint':'groupSizeHint',{count:$('groupNumber').value}));renderContext()}
function renderGroupResult(){
  const r=rosterForKind('person');const cards=state.groups.map((group,i)=>{const div=document.createElement('div');div.className='group-card';const b=document.createElement('b');b.textContent=t('groupCard',{index:i+1,count:group.length});div.append(b,...group.map(row=>{const span=document.createElement('span');span.textContent=label(row,r);return span}));return div});
  $('groupResult').className='group-result';$('groupResult').classList.toggle('hidden',state.groupDisplay!=='grid');$('groupResult').replaceChildren(...cards);$('copyGroup').disabled=false;$('exportGroup').disabled=false;renderGroupReveal();renderContext();
}
function generateGroups(){const r=roster();state.groups=makeGroups(r.rows,state.groupMethod,$('groupNumber').value);state.groupRevealIndex=0;shuffleSound();renderGroupResult();palSays(t('groupDonePal',{count:state.groups.length}))}
function pairText(key,count,values={}){return t(count===1?`${key}One`:key,{count,...values})}
function clearPairings(){if(!state.pairings.length)return;state.pairings=[];state.pairRevealIndex=0;$('pairResult').className='group-result empty-result';$('pairResult').classList.toggle('hidden',state.pairDisplay!=='grid');setText('pairResult',uiText('點擊下方按鈕產生配對'));$('copyPair').disabled=true;$('exportPair').disabled=true;renderPairReveal()}
function updatePairMethod(method){if(state.pairMethod!==method)clearPairings();state.pairMethod=method;document.querySelectorAll('[data-pair-method]').forEach(b=>b.classList.toggle('active',b.dataset.pairMethod===method));setText('pairNumberLabel',t(method==='count'?'pairCountLabel':'pairSizeLabel'));updatePairHint()}
function updatePairHint(){const r=rosterForKind('team'),plan=planTeamMatches(r.rows.length,state.pairMethod,$('pairNumber').value);setText('pairHint',r.rows.length<2?t('needTwoTeams'):pairText('pairPlanHint',plan.count,{min:Math.min(...plan.sizes),max:Math.max(...plan.sizes)}));renderContext()}
function renderPairResult(){
  const r=rosterForKind('team');const cards=state.pairings.map((match,i)=>{const div=document.createElement('div');div.className='group-card';const b=document.createElement('b');b.textContent=t('pairCard',{index:i+1,count:match.length});div.append(b,...match.map(row=>{const span=document.createElement('span');span.textContent=label(row,r);return span}));return div});
  $('pairResult').className='group-result';$('pairResult').classList.toggle('hidden',state.pairDisplay!=='grid');$('pairResult').replaceChildren(...cards);$('copyPair').disabled=false;$('exportPair').disabled=false;renderPairReveal();renderContext();
}
function generatePairings(){const r=rosterForKind('team');if(r.rows.length<2){notify(t('needTwoTeams'));return}state.pairings=makeTeamMatches(r.rows,state.pairMethod,$('pairNumber').value);state.pairRevealIndex=0;shuffleSound();renderPairResult();palSays(pairText('pairDonePal',state.pairings.length))}
function renderTaskResult(){
  const r=rosterForKind('task'),last=state.taskDraws.at(-1);
  if(last){const parts=r.displayColumns.map(i=>localizedRow(last,r)[i]).filter(Boolean);setText('taskStageTitle',parts[0]||'—');setText('taskStageDetail',parts.slice(1).join(' · ')||t('taskDone',{count:state.taskDraws.length}))}
  else{setText('taskStageTitle',uiText('準備開箱'));setText('taskStageDetail',uiText('按下按鈕，看看這次要挑戰什麼！'))}
  $('taskStage').classList.toggle('opened',Boolean(last));
  $('taskHistory').replaceChildren(...(state.taskDraws.length?[(()=>{const heading=document.createElement('b');heading.textContent=t('taskHistoryTitle');return heading})(),...state.taskDraws.map((row,i)=>{const item=document.createElement('span');item.textContent=`${i+1}. ${label(row,r)}`;return item})]:[]));
  $('copyTask').disabled=!last;$('exportTask').disabled=!last;
}
function drawTask(){
  if(state.running)return;const r=rosterForKind('task'),exclude=$('taskNoRepeat').checked,pool=r.rows.map((_,i)=>i).filter(i=>!exclude||!r.picked.includes(i));
  if(!pool.length){notify(t('taskEmpty'));return}
  const index=pool[randomInt(pool.length)];state.running=true;$('taskBtn').disabled=true;$('taskStage').classList.remove('opened');setText('taskStageTitle','✦ ✦ ✦');setText('taskStageDetail','');shuffleSound();
  setTimeout(()=>{if(exclude)r.picked.push(index);state.taskDraws.push(r.rows[index]);state.running=false;$('taskBtn').disabled=false;persist();renderTaskResult();renderStats();palSays(t('taskPickedPal',{name:label(r.rows[index],r)}));successSound()},reducedMotion?80:520);
}
function renderRoleResult(){
  if(!state.rolesAssigned.length){$('roleResult').className='assignment-list empty-result';setText('roleResult',uiText('點擊下方按鈕分派角色'))}
  else{
    const targetRoster=rosterForKind(state.roleTargetKind),deck=rosterForKind('role');
    $('roleResult').className='assignment-list';$('roleResult').replaceChildren(...state.rolesAssigned.map(({target,role})=>{const card=document.createElement('div');card.className='assignment-item';const who=document.createElement('b');who.textContent=label(target,targetRoster);const arrow=document.createElement('span');arrow.textContent='→';const job=document.createElement('strong');job.textContent=label(role,deck);card.append(who,arrow,job);return card}));
  }
  $('copyRole').disabled=!state.rolesAssigned.length;$('exportRole').disabled=!state.rolesAssigned.length;
}
function generateRoles(){
  const targets=rosterForKind(state.roleTargetKind).rows,roles=rosterForKind('role').rows;
  if(!targets.length||!roles.length){notify(t('needRoleTargets'));return}
  state.rolesAssigned=assignRoles(targets,roles,state.previousRoles);state.previousRoles=state.rolesAssigned;shuffleSound();renderRoleResult();renderContext();palSays(t('roleAssignedPal'));
}
function renderReviewReveal(){
  const total=state.reviewRounds.length,index=state.reviewRevealIndex,r=rosterForKind('team');$('revealReviewBtn').disabled=!total||index>=total;
  setText('reviewProgress',total?t('reviewRevealProgress',{done:index,total}):uiText('尚未產生互評路線'));
  if(!total){setText('reviewRevealNumber','?');setText('reviewRevealTitle',uiText('產生後，逐輪揭曉'));setText('reviewRevealPairs',uiText('每次揭曉一輪'))}
  else if(!index){setText('reviewRevealNumber','READY');setText('reviewRevealTitle',t('reviewRevealFirst'));setText('reviewRevealPairs',t('reviewReadyText'))}
  else{setText('reviewRevealNumber',t('reviewRound',{index}));setText('reviewRevealTitle',t('reviewRound',{index}));$('reviewRevealPairs').replaceChildren(...state.reviewRounds[index-1].map(({reviewer,subject})=>{const item=document.createElement('span');item.textContent=t('reviewLink',{from:label(reviewer,r),to:label(subject,r)});return item}))}
}
function renderReviewResult(){
  const r=rosterForKind('team');
  if(!state.reviewRounds.length){$('reviewResult').className='review-result empty-result';setText('reviewResult',uiText('點擊下方按鈕產生互評路線'))}
  else{$('reviewResult').className='review-result';$('reviewResult').replaceChildren(...state.reviewRounds.map((round,i)=>{const card=document.createElement('article');card.className='review-round';const heading=document.createElement('b');heading.textContent=t('reviewRound',{index:i+1});card.append(heading,...round.map(({reviewer,subject})=>{const line=document.createElement('span');line.textContent=t('reviewLink',{from:label(reviewer,r),to:label(subject,r)});return line}));return card}))}
  $('reviewResult').classList.toggle('hidden',state.reviewDisplay!=='grid');$('reviewReveal').classList.toggle('hidden',state.reviewDisplay!=='reveal');$('copyReview').disabled=!state.reviewRounds.length;$('exportReview').disabled=!state.reviewRounds.length;renderReviewReveal();
}
function setReviewDisplay(display){state.reviewDisplay=display;document.querySelectorAll('[data-review-display]').forEach(b=>b.classList.toggle('selected',b.dataset.reviewDisplay===display));renderReviewResult();renderContext()}
function clearReview(){state.reviewRounds=[];state.reviewRevealIndex=0;renderReviewResult();renderContext()}
function generateReview(){
  const r=rosterForKind('team');if(r.rows.length<2){notify(t('needReviewTeams'));return}
  state.reviewRounds=makeReviewCircuit(r.rows,$('reviewRounds').value);state.reviewRevealIndex=0;shuffleSound();renderReviewResult();renderContext();palSays(t('reviewAssignedPal'));
}
function revealReview(){if(state.reviewRevealIndex>=state.reviewRounds.length)return;state.reviewRevealIndex++;renderReviewReveal();animateReveal('revealReviewBtn');renderContext();tone(523,.09);tone(659,.12,.1)}
function renderMixerResult(){
  const topic=creativeDeck('topic'),format=creativeDeck('format'),topics=creativeRows('topic'),formats=creativeRows('format'),last=state.mixerPairs.at(-1);
  setText('mixerTopic',last?label(topics[last[0]],topic):'？');setText('mixerFormat',last?label(formats[last[1]],format):'？');
  $('mixerHistory').replaceChildren(...state.mixerPairs.map((pair,i)=>{const chip=document.createElement('span');chip.textContent=`${i+1}. ${label(topics[pair[0]],topic)} + ${label(formats[pair[1]],format)}`;return chip}));
  $('copyMixer').disabled=!last;$('exportMixer').disabled=!last;
  const total=topics.length*formats.length-(topic.id===format.id?topics.length:0);
  setText('mixerHint',t('mixerHint',{left:Math.max(0,total-state.mixerPairs.length),total}));
}
function generateMixer(){
  const topic=creativeDeck('topic'),format=creativeDeck('format'),pair=drawIdeaPair(creativeRows('topic'),creativeRows('format'),state.mixerPairs,topic.id===format.id);
  if(!pair){notify(t('mixerEmpty'));return}state.mixerPairs.push(pair);shuffleSound();renderMixerResult();renderContext();palSays(t('mixerPal'));
}
function renderTwistResult(){
  const deck=creativeDeck('twist'),rows=creativeRows('twist'),index=state.twistIndices.at(-1),last=index===undefined?null:rows[index];
  if(last){const parts=deck.displayColumns.map(i=>localizedRow(last,deck)[i]).filter(Boolean);setText('twistTitle',parts[0]||'—');setText('twistDetail',parts.slice(1).join(' · ')||t('twistUsed',{count:state.twistIndices.length}))}
  else{setText('twistTitle',t('twistReady'));setText('twistDetail',t('twistReadyHint'))}
  $('twistStage').classList.toggle('opened',Boolean(last));$('twistHistory').replaceChildren(...state.twistIndices.map((i,n)=>{const chip=document.createElement('span');chip.textContent=`${n+1}. ${label(rows[i],deck)}`;return chip}));
  $('copyTwist').disabled=!last;$('exportTwist').disabled=!last;setText('twistHint',t('twistHint',{left:Math.max(0,rows.length-state.twistIndices.length)}));
}
function generateTwist(){
  const pool=creativeRows('twist').map((_,i)=>i).filter(i=>!state.twistIndices.includes(i));if(!pool.length){notify(t('twistEmpty'));return}
  state.twistIndices.push(pool[randomInt(pool.length)]);shuffleSound();renderTwistResult();renderContext();palSays(t('twistPal'));
}
function bingoWins(size){
  if(!state.bingoRows.length)return 0;const marked=state.bingoMarks,lines=[];
  for(let n=0;n<size;n++){lines.push(Array.from({length:size},(_,i)=>n*size+i));lines.push(Array.from({length:size},(_,i)=>i*size+n))}
  lines.push(Array.from({length:size},(_,i)=>i*size+i),Array.from({length:size},(_,i)=>i*size+size-1-i));
  return lines.filter(line=>line.every(i=>marked.has(i))).length;
}
function renderBingoResult(){
  const board=$('bingoBoard'),size=Number($('bingoSize').value),deck=creativeDeck('bingo');board.style.setProperty('--bingo-size',size);
  if(!state.bingoRows.length){board.replaceChildren((()=>{const p=document.createElement('p');p.textContent=t('bingoReady');return p})());setText('bingoHint',t('bingoNeed',{count:size*size,available:bingoPool().length}))}
  else{
    board.replaceChildren(...state.bingoRows.map((row,i)=>{const cell=document.createElement('button');cell.type='button';cell.className='bingo-cell'+(state.bingoMarks.has(i)?' marked':'');cell.setAttribute('aria-pressed',String(state.bingoMarks.has(i)));cell.textContent=label(row,deck);cell.addEventListener('click',()=>{const before=bingoWins(size);state.bingoMarks.has(i)?state.bingoMarks.delete(i):state.bingoMarks.add(i);renderBingoResult();renderContext();if(bingoWins(size)>before)successSound()});return cell}));
    setText('bingoHint',t('bingoProgress',{marked:state.bingoMarks.size,total:state.bingoRows.length,lines:bingoWins(size)}));
  }
  $('printBingo').disabled=!state.bingoRows.length;$('exportBingo').disabled=!state.bingoRows.length;
}
function generateBingo(){
  const size=Number($('bingoSize').value);state.bingoRows=makeBingoCard(bingoPool(),size);if(!state.bingoRows.length){notify(t('bingoNeed',{count:size*size,available:bingoPool().length}));return}
  state.bingoMarks.clear();shuffleSound();renderBingoResult();renderContext();palSays(t('bingoPal'));
}
function downloadCsv(filename,columns,rows){
  const safe=value=>{let text=String(value??'');if(/^[=+@-]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"'};
  const csv='\uFEFF'+[columns,...rows].map(row=>row.map(safe).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function copy(text){try{await navigator.clipboard.writeText(text);notify(t('copySuccess'))}catch{notify(t('copyError'))}}
function editorData(){
  const text=$('rosterText').value.trim();if(!text)return {columns:[t(({person:'nameColumn',team:'teamNameColumn',task:'taskColumn',role:'roleColumn'})[$('rosterKind').value])],rows:[]};
  if(text.includes('\t'))return makeRecordSet(parseDelimited(text,'\t'),true,getLanguage());
  if(['task','role'].includes($('rosterKind').value))return {columns:[state.editorSingleColumnName],rows:text.split(/\r?\n/).map(value=>[value.trim()]).filter(row=>row[0])};
  const lines=text.split(/\r?\n/).filter(Boolean);
  if(lines.length>1&&lines[0].includes(','))return makeRecordSet(parseCsv(text),true,getLanguage());
  return {columns:[state.editorSingleColumnName],rows:parseNames(text).map(name=>[name])};
}
function renderFieldChoices(columns){
  const choices=columns.map((column,i)=>{const item=document.createElement('label');item.className='field-choice';const input=document.createElement('input');input.type='checkbox';input.checked=state.editorSelection.has(i);input.addEventListener('change',()=>{if(input.checked)state.editorSelection.add(i);else state.editorSelection.delete(i)});const span=document.createElement('span');span.textContent=column;item.append(input,span);return item});
  $('fieldChoices').replaceChildren(...choices);
}
function renderEditorKind(){
  const kind=$('rosterKind').value;
  setText('rosterRowsLabel',t(({person:'personRowsLabel',team:'teamRowsLabel',task:'taskRowsLabel',role:'roleRowsLabel'})[kind]));
  setText('rosterRowsHelp',t(({person:'personRowsHelp',team:'teamRowsHelp',task:'taskRowsHelp',role:'roleRowsHelp'})[kind]));
  $('rosterText').placeholder=t(({person:'personRowsPlaceholder',team:'teamRowsPlaceholder',task:'taskRowsPlaceholder',role:'roleRowsPlaceholder'})[kind]);
}
function openEditor(isNew=false,kind=currentKind()){
  if(state.running)return;state.editingNew=isNew;const r=rosterForKind(kind);$('rosterKind').value=kind;$('rosterKind').disabled=!isNew;$('rosterNameInput').value=isNew?t(({person:'newRoster',team:'newTeamRoster',task:'newTaskRoster',role:'newRoleRoster'})[kind]):r.name;
  $('rosterText').value=isNew?'':r.columns.length===1?r.rows.map(row=>row[0]).join('\n'):serializeTsv(r.columns,r.rows);
  state.editorSelection=new Set(isNew?[0]:r.displayColumns);state.editorSingleColumnName=isNew?t(({person:'nameColumn',team:'teamNameColumn',task:'taskColumn',role:'roleColumn'})[kind]):r.columns[0];state.editorColumnsSignature=JSON.stringify(isNew?[state.editorSingleColumnName]:r.columns);state.importTable=null;$('firstRowHeader').checked=true;$('firstRowHeader').disabled=false;
  $('deleteRoster').hidden=isNew||state.data.rosters.filter(item=>item.kind===r.kind).length===1;renderEditorKind();updateEditorCount();$('rosterDialog').showModal();
}
function updateEditorCount(){const data=editorData(),signature=JSON.stringify(data.columns);if(signature!==state.editorColumnsSignature){state.editorSelection=new Set(defaultDisplay(data.columns,$('rosterKind').value));state.editorColumnsSignature=signature}setText('editorCount',t(({person:'editorCount',team:'editorTeamCount',task:'taskEditorCount',role:'roleEditorCount'})[$('rosterKind').value],{rows:data.rows.length,columns:data.columns.length}));renderFieldChoices(data.columns)}
function saveEditor(event){
  event.preventDefault();const name=$('rosterNameInput').value.trim(),data=editorData();
  if(!name){notify(t('enterRosterName'));return}if(!data.rows.length){notify(t('needRow'));return}
  const displayColumns=[...state.editorSelection].filter(i=>i<data.columns.length).sort((a,b)=>a-b);
  if(!displayColumns.length){notify(t('needDisplayColumn'));return}
  if(state.editingNew){const id=crypto.randomUUID(),kind=$('rosterKind').value;state.data.rosters.push({id,kind,name,...data,displayColumns,picked:[]});state.data[selectedKey[kind]]=id;const slot=kind==='task'?creativeSlot(state.mode):null;if(slot)state.data.creativeDecks[slot]=id;else if(kind==='task')state.data.selectedNormalTaskId=id;setMode(slot?state.mode:({person:'group',team:'pair',task:'task',role:'role'})[kind])}
  else{const r=rosterForKind($('rosterKind').value);Object.assign(r,{name,...data,displayColumns,picked:[]})}
  persist();clearResults();render();$('rosterDialog').close();notify(t('rosterSaved'));
}
function deleteRoster(){const selected=rosterForKind($('rosterKind').value);if(state.data.rosters.filter(r=>r.kind===selected.kind).length===1)return;state.data.rosters=state.data.rosters.filter(r=>r.id!==selected.id);state.data[selectedKey[selected.kind]]=state.data.rosters.find(r=>r.kind===selected.kind).id;if(selected.kind==='task'){if(state.data.selectedNormalTaskId===selected.id)state.data.selectedNormalTaskId=state.data.selectedTaskId;for(const slot of Object.keys(state.data.creativeDecks))if(state.data.creativeDecks[slot]===selected.id)state.data.creativeDecks[slot]=state.data.selectedTaskId}persist();clearResults();render();$('rosterDialog').close();notify(t('rosterDeleted'))}
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
    if(state.editingNew||['newRoster','newTeamRoster','newTaskRoster','newRoleRoster'].some(key=>$('rosterNameInput').value===t(key)))$('rosterNameInput').value=file.name.replace(/\.[^.]+$/,'');
    applyImportPreview();
  }catch(error){notify(translateImportError(error.message)||t('importFailed'))}finally{$('importFile').value=''}
}
function applyImportPreview(){
  if(!state.importTable)return;
  const data=makeRecordSet(state.importTable,$('firstRowHeader').checked,getLanguage());
  if(!data.rows.length){$('rosterText').value='';updateEditorCount();notify(t('noDataRows'));return}
  state.editorSingleColumnName=data.columns[0];
  $('rosterText').value=data.columns.length===1?data.rows.map(row=>row[0]).join('\n'):serializeTsv(data.columns,data.rows);
  state.editorSelection=new Set(defaultDisplay(data.columns,$('rosterKind').value));updateEditorCount();notify(t('importPreview',{rows:data.rows.length,columns:data.columns.length}));
}
function updateProjectionButton(){const active=document.body.classList.contains('stage-view');$('openTab').firstChild.textContent=active?'↙ ':'↗ ';$('openTab').querySelector('span').textContent=active?t('backToNormal'):(uiText('投影模式'));$('openTab').title=t(active?'backToNormal':'switchProjection');$('openTab').setAttribute('aria-pressed',String(active))}
function openTab(){
  const url=new URL('index.html',location.href);
  if(document.body.classList.contains('stage-view')){
    document.body.classList.remove('stage-view');url.searchParams.delete('view');history.replaceState(null,'',url);updateProjectionButton();renderStats();requestAnimationFrame(drawWheel);return;
  }
  url.searchParams.set('view','stage');url.searchParams.set('mode',state.mode);url.searchParams.set('display',state.display);url.searchParams.set('orderDisplay',state.orderDisplay);url.searchParams.set('groupDisplay',state.groupDisplay);url.searchParams.set('pairDisplay',state.pairDisplay);url.searchParams.set('reviewDisplay',state.reviewDisplay);
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
  document.querySelectorAll('[data-display]').forEach(b=>b.addEventListener('click',()=>setDisplay(b.dataset.display)));
  document.querySelectorAll('[data-order-display]').forEach(b=>b.addEventListener('click',()=>setOrderDisplay(b.dataset.orderDisplay)));
  document.querySelectorAll('[data-group-display]').forEach(b=>b.addEventListener('click',()=>setGroupDisplay(b.dataset.groupDisplay)));
  document.querySelectorAll('[data-pair-display]').forEach(b=>b.addEventListener('click',()=>setPairDisplay(b.dataset.pairDisplay)));
  document.querySelectorAll('[data-review-display]').forEach(b=>b.addEventListener('click',()=>setReviewDisplay(b.dataset.reviewDisplay)));
  document.querySelectorAll('[data-card]').forEach(b=>b.addEventListener('click',()=>pick(Number(b.dataset.card))));
  $('revealOrderBtn').addEventListener('click',revealOrder);$('revealGroupBtn').addEventListener('click',revealGroup);$('revealPairBtn').addEventListener('click',revealPair);$('revealReviewBtn').addEventListener('click',revealReview);
  document.querySelectorAll('[data-group-method]').forEach(b=>b.addEventListener('click',()=>updateGroupMethod(b.dataset.groupMethod)));
  document.querySelectorAll('[data-pair-method]').forEach(b=>b.addEventListener('click',()=>updatePairMethod(b.dataset.pairMethod)));
  $('rosterSelect').addEventListener('change',e=>selectRoster(e.target.value));$('addRoster').addEventListener('click',()=>openEditor(true));['editRoster','editRosterAside'].forEach(id=>$(id).addEventListener('click',()=>openEditor()));$('rosterForm').addEventListener('submit',saveEditor);$('rosterText').addEventListener('input',updateEditorCount);$('closeDialog').addEventListener('click',()=>$('rosterDialog').close());$('cancelDialog').addEventListener('click',()=>$('rosterDialog').close());$('deleteRoster').addEventListener('click',deleteRoster);$('importButton').addEventListener('click',()=>$('importFile').click());$('importFile').addEventListener('change',e=>importFile(e.target.files[0]));
  $('firstRowHeader').addEventListener('change',applyImportPreview);
  $('rosterKind').addEventListener('change',()=>{state.editorSingleColumnName=t(({person:'nameColumn',team:'teamNameColumn',task:'taskColumn',role:'roleColumn'})[$('rosterKind').value]);state.editorColumnsSignature='';renderEditorKind();updateEditorCount()});
  $('pickBtn').addEventListener('click',()=>pick());$('excludePicked').addEventListener('change',drawWheel);$('resetPool').addEventListener('click',()=>{if(state.running)return;roster().picked=[];persist();renderStats();notify(t('resetDone'))});$('orderBtn').addEventListener('click',generateOrder);$('groupBtn').addEventListener('click',generateGroups);$('groupNumber').addEventListener('input',updateGroupHint);
  $('pairBtn').addEventListener('click',generatePairings);$('pairNumber').addEventListener('input',()=>{clearPairings();updatePairHint()});
  $('taskBtn').addEventListener('click',drawTask);$('taskNoRepeat').addEventListener('change',renderStats);$('resetTasks').addEventListener('click',()=>{const r=rosterForKind('task');r.picked=[];state.taskDraws=[];persist();renderTaskResult();renderStats();notify(t('taskReset'))});
  $('roleBtn').addEventListener('click',generateRoles);$('roleTargetKind').addEventListener('change',event=>{state.roleTargetKind=event.target.value;clearResults();setMode('role')});
  $('roleDeckSelect').addEventListener('change',event=>{state.data.selectedRoleId=event.target.value;clearResults();persist();render()});$('editRoleDeck').addEventListener('click',()=>openEditor(false,'role'));
  $('reviewBtn').addEventListener('click',generateReview);$('reviewRounds').addEventListener('input',()=>{clearReview();renderStats()});
  for(const [id,slot] of [['mixerTopicDeck','topic'],['mixerFormatDeck','format'],['twistDeck','twist'],['bingoDeck','bingo']])$(id).addEventListener('change',event=>{state.data.creativeDecks[slot]=event.target.value;if(slot!=='format')state.data.selectedTaskId=event.target.value;clearResults();persist();render()});
  $('editMixerDeck').addEventListener('click',()=>{state.data.selectedTaskId=creativeDeck('topic').id;openEditor(false,'task')});$('editTwistDeck').addEventListener('click',()=>{state.data.selectedTaskId=creativeDeck('twist').id;openEditor(false,'task')});$('editBingoDeck').addEventListener('click',()=>{state.data.selectedTaskId=creativeDeck('bingo').id;openEditor(false,'task')});
  $('mixerBtn').addEventListener('click',generateMixer);$('resetMixer').addEventListener('click',()=>{state.mixerPairs=[];renderMixerResult();renderContext()});
  $('twistBtn').addEventListener('click',generateTwist);$('resetTwist').addEventListener('click',()=>{state.twistIndices=[];renderTwistResult();renderContext()});
  $('bingoSize').addEventListener('change',()=>{state.bingoRows=[];state.bingoMarks.clear();renderStats();renderBingoResult();renderContext()});$('bingoBtn').addEventListener('click',generateBingo);$('resetBingo').addEventListener('click',()=>{state.bingoMarks.clear();renderBingoResult();renderContext()});$('printBingo').addEventListener('click',()=>window.print());
  $('copyOrder').addEventListener('click',()=>copy(state.order.map((row,i)=>`${i+1}. ${label(row)}`).join('\n')));
  $('copyGroup').addEventListener('click',()=>copy(state.groups.map((group,i)=>`${t('groupNumber',{index:i+1})}\n${group.map(row=>label(row)).join(getLanguage()==='en'?', ':'、')}`).join('\n\n')));
  $('copyPair').addEventListener('click',()=>copy(state.pairings.map((match,i)=>`${t('pairNumber',{index:i+1})}\n${match.map(row=>label(row,rosterForKind('team'))).join(getLanguage()==='en'?', ':'、')}`).join('\n\n')));
  $('copyTask').addEventListener('click',()=>copy(state.taskDraws.map((row,i)=>`${i+1}. ${label(row,rosterForKind('task'))}`).join('\n')));
  $('copyRole').addEventListener('click',()=>copy(state.rolesAssigned.map(({target,role})=>`${label(target,rosterForKind(state.roleTargetKind))} → ${label(role,rosterForKind('role'))}`).join('\n')));
  $('copyReview').addEventListener('click',()=>copy(state.reviewRounds.map((round,i)=>`${t('reviewRound',{index:i+1})}\n${round.map(({reviewer,subject})=>t('reviewLink',{from:label(reviewer,rosterForKind('team')),to:label(subject,rosterForKind('team'))})).join('\n')}`).join('\n\n')));
  $('copyMixer').addEventListener('click',()=>copy(state.mixerPairs.map((pair,i)=>`${i+1}. ${label(creativeRows('topic')[pair[0]],creativeDeck('topic'))} + ${label(creativeRows('format')[pair[1]],creativeDeck('format'))}`).join('\n')));
  $('copyTwist').addEventListener('click',()=>copy(state.twistIndices.map((i,n)=>`${n+1}. ${label(creativeRows('twist')[i],creativeDeck('twist'))}`).join('\n')));
  $('exportOrder').addEventListener('click',()=>downloadCsv(`${roster().name}-${t('orderFile')}.csv`,[t('orderColumn'),...roster().columns],state.order.map((row,i)=>[i+1,...row])));
  $('exportGroup').addEventListener('click',()=>downloadCsv(`${roster().name}-${t('groupFile')}.csv`,[t('groupColumn'),...roster().columns],state.groups.flatMap((group,i)=>group.map(row=>[i+1,...row]))));
  $('exportPair').addEventListener('click',()=>{const r=rosterForKind('team');downloadCsv(`${r.name}-${t('pairFile')}.csv`,[t('pairColumn'),...r.columns],state.pairings.flatMap((match,i)=>match.map(row=>[i+1,...row])))});
  $('exportTask').addEventListener('click',()=>{const r=rosterForKind('task');downloadCsv(`${r.name}-${t('taskFile')}.csv`,r.columns,state.taskDraws)});
  $('exportRole').addEventListener('click',()=>{const target=rosterForKind(state.roleTargetKind),roles=rosterForKind('role');downloadCsv(`${roles.name}-${t('roleFile')}.csv`,[...target.columns.map(column=>`${t('roleTargetColumn')} · ${column}`),...roles.columns.map(column=>`${t('roleColumn')} · ${column}`)],state.rolesAssigned.map(pair=>[...pair.target,...pair.role]))});
  $('exportReview').addEventListener('click',()=>{const r=rosterForKind('team');downloadCsv(`${r.name}-${t('reviewFile')}.csv`,[t('reviewRoundColumn'),...r.columns.map(column=>`${t('reviewerColumn')} · ${column}`),...r.columns.map(column=>`${t('revieweeColumn')} · ${column}`)],state.reviewRounds.flatMap((round,i)=>round.map(({reviewer,subject})=>[i+1,...reviewer,...subject]))) });
  $('exportMixer').addEventListener('click',()=>{const a=creativeDeck('topic'),b=creativeDeck('format'),left=creativeRows('topic'),right=creativeRows('format');downloadCsv(`${t('mixerFile')}.csv`,[t('orderColumn'),...a.columns.map(c=>`${t('topicColumn')} · ${c}`),...b.columns.map(c=>`${t('formatColumn')} · ${c}`)],state.mixerPairs.map(([i,j],n)=>[n+1,...left[i],...right[j]]))});
  $('exportTwist').addEventListener('click',()=>{const deck=creativeDeck('twist'),rows=creativeRows('twist');downloadCsv(`${deck.name}-${t('twistFile')}.csv`,[t('orderColumn'),...deck.columns],state.twistIndices.map((i,n)=>[n+1,...rows[i]]))});
  $('exportBingo').addEventListener('click',()=>{const deck=creativeDeck('bingo'),size=Number($('bingoSize').value);downloadCsv(`${deck.name}-${t('bingoFile')}.csv`,[t('bingoRowColumn'),t('bingoColColumn'),t('bingoMarkedColumn'),...deck.columns],state.bingoRows.map((row,i)=>[Math.floor(i/size)+1,i%size+1,state.bingoMarks.has(i)?t('yes'):t('no'),...row]))});
  $('openTab').addEventListener('click',openTab);$('homeLink').addEventListener('click',()=>showPage('playground'));
  $('rosterStudioLink').addEventListener('click',()=>showPage('studio'));$('ideasLink').addEventListener('click',()=>showPage('ideas'));
  $('studioAdd').addEventListener('click',()=>openEditor(true));$('studioImport').addEventListener('click',()=>{openEditor(true);$('importFile').click()});
  document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>applyPreset(button.dataset.preset)));
  $('soundToggle').addEventListener('click',()=>{state.data.soundEnabled=!state.data.soundEnabled;persist();renderSound();if(state.data.soundEnabled)tone(659,.1)});
}
state.data=await loadState();setLanguage(state.data.language);translateStatic();bind();if(reducedMotion){$('palArt').src=idlePal;document.querySelector('.context-pal img').src=idlePal}render();const params=new URLSearchParams(location.search),view=params.get('view');setMode(Object.hasOwn(activityMeta,params.get('mode'))?params.get('mode'):'pick');if(['slot','wheel','cards'].includes(params.get('display')))setDisplay(params.get('display'));if(['list','reveal'].includes(params.get('orderDisplay')))setOrderDisplay(params.get('orderDisplay'));if(['grid','reveal'].includes(params.get('groupDisplay')))setGroupDisplay(params.get('groupDisplay'));if(['grid','reveal'].includes(params.get('pairDisplay')))setPairDisplay(params.get('pairDisplay'));if(['grid','reveal'].includes(params.get('reviewDisplay')))setReviewDisplay(params.get('reviewDisplay'));if(view==='stage')document.body.classList.add('stage-view');else if(view==='popup'||location.protocol==='chrome-extension:')document.body.classList.add('popup-view');setupSidebar();renderLocalized();requestAnimationFrame(drawWheel);window.addEventListener('resize',()=>requestAnimationFrame(drawWheel));window.addEventListener('storage',event=>{if(event.key==='randopal-state-v1'&&event.newValue){try{syncLanguage(JSON.parse(event.newValue))}catch{}}});if(typeof chrome!=='undefined'&&chrome.storage?.onChanged)chrome.storage.onChanged.addListener(changes=>{const data=changes['randopal-state-v1']?.newValue;if(data)syncLanguage(typeof data==='string'?JSON.parse(data):data)});
