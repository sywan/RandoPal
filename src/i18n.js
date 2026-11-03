export const LANGUAGES=[{code:'zh-Hant',label:'繁體中文'},{code:'en',label:'English'}];
let language='zh-Hant';
export function setLanguage(code){language=LANGUAGES.some(item=>item.code===code)?code:'zh-Hant';document.documentElement.lang=language}
export function getLanguage(){return language}
const importErrors={
  '不是有效的 Excel .xlsx 檔案':'This is not a valid Excel .xlsx file.',
  'Excel 檔案結構不完整':'The Excel file is incomplete.',
  '不支援此 Excel 壓縮格式':'This Excel compression format is not supported.',
  'Excel XML 無法解析':'Could not parse the Excel XML.',
  '找不到 Excel 工作表':'No Excel worksheet was found.'
};
export function translateImportError(message){return language==='en'?importErrors[message]||message:message}

// The original HTML is the Traditional Chinese source. Only its recorded nodes are translated.
// User-entered roster names and imported values are never passed through this map.
export const staticEnglish={
  'RandoPal · 讓隨機變得有趣':'RandoPal · Make randomness fun',
  '你的隨機好夥伴':'Your random pal',
  '工作空間':'Workspace','隨機遊樂場':'Random Playground','名單工作室':'Roster Studio','玩法靈感':'Play Ideas','我的名單':'My Rosters',
  '嗨！選個玩法，我陪你一起玩。':'Hi! Pick a game and let’s play.','下載動畫 GIF ↓':'Download animated GIF ↓','靜態 PNG ↓':'Static PNG ↓',
  '本機儲存':'Saved locally','音效關':'Sound off','投影模式':'Presentation mode',
  '選一種玩法，讓 RandoPal 幫你決定。':'Choose an activity and let RandoPal decide.','目前名單':'Current roster','編輯':'Edit',
  '隨機抽選':'Random Pick','隨機排序':'Random Order','智慧分組':'Smart Groups',
  '看看今天的幸運兒':'Meet today’s lucky pick','0 位成員':'0 members','呈現方式 · 抽選':'Presentation · Pick',
  '✦ 跑馬燈':'✦ Slot Machine','◉ 幸運轉盤':'◉ Lucky Wheel','▣ 翻牌':'▣ Flip Cards',
  '準備好抽出下一位了嗎？':'Ready to pick the next person?','點擊開始抽選':'Click to start picking','每個人都有一樣的機會':'Everyone has an equal chance',
  '選一張牌，看看幸運落在誰身上':'Choose a card to reveal the lucky pick','抽過即排除':'Exclude previous picks','↺ 重設本輪':'↺ Reset round','開始抽選':'Start picking',
  '將整份名單打散，產生一份公平的出場順序。':'Shuffle the roster into a fair presentation order.','呈現方式 · 排序':'Presentation · Order',
  '☷ 完整清單':'☷ Full List','✦ 逐位揭曉':'✦ Reveal One by One','點擊下方按鈕產生順序':'Click below to generate an order',
  '尚未產生順序':'No order yet','產生順序後，點擊揭曉':'Generate an order, then tap to reveal','每次揭曉一位':'Reveal one person at a time','產生隨機順序':'Generate random order',
  '複製':'Copy','匯出 CSV':'Export CSV','輕鬆分隊，每組的人數會盡量平均。':'Make balanced teams in a tap.',
  '指定組數':'Number of groups','每組人數':'People per group','分成幾組':'How many groups','將所有成員平均分成 3 組':'Split everyone evenly into 3 groups',
  '呈現方式 · 分組':'Presentation · Groups','▦ 分組總覽':'▦ Group Overview','✦ 逐組揭曉':'✦ Reveal Group by Group',
  '點擊下方按鈕產生分組':'Click below to create groups','尚未產生分組':'No groups yet','產生分組後，點擊揭曉':'Create groups, then tap to reveal',
  '每次揭曉一組':'Reveal one group at a time','開始分組':'Create groups',
  '抽選進度':'Pick Progress','示範名單':'Sample Roster','總人數':'Total','本輪剩餘':'Remaining','本輪已抽出':'Picked this round','0 位':'0 people','還沒有抽出任何人':'No one picked yet',
  '位成員等待排序':'members waiting to be ordered','產生順序後，這裡會顯示完成進度。':'Progress will appear here after you generate an order.',
  '預計分成 3 組':'Planning 3 groups','每組人數會盡量平均。':'Group sizes will be as even as possible.','咕嘎陪你抽出幸運兒！':'Guga is here for the lucky pick!','管理名單':'Manage Roster',
  '把常用名單整理好，每次玩都能立刻選用。匯入 CSV、Excel 或貼上多欄資料，也能指定結果要顯示哪些欄位。':'Keep your rosters ready to use. Import CSV or Excel, paste multiple columns, and choose which fields to show.',
  '＋ 新增名單':'＋ New Roster','⇧ 匯入檔案':'⇧ Import File',
  '同一份名單，可以玩出不同節奏。選一張情境卡，就會替你切換到適合的玩法。':'One roster, many ways to play. Choose a scenario to open a matching activity.',
  '暖場點名':'Warm-up Pick','跑馬燈抽出下一位，適合快速問答。':'Use the slot machine to pick the next person for a quick question.','開啟跑馬燈 →':'Open Slot Machine →',
  '幸運轉盤':'Lucky Wheel','讓每個名字都上轉盤，適合全場一起期待。':'Put every name on the wheel and build anticipation together.','開啟轉盤 →':'Open Wheel →',
  '神祕翻牌':'Mystery Cards','挑一張牌揭曉幸運兒，適合小驚喜。':'Flip a card for a little surprise.','開啟翻牌 →':'Open Cards →',
  '報告順序':'Presentation Order','先排好順序，再逐位揭曉出場者。':'Set the order, then reveal presenters one by one.','開啟逐位揭曉 →':'Open Reveal →',
  '破冰組隊':'Icebreaker Teams','平均分組，逐組揭曉新隊友。':'Build balanced groups and reveal teammates one group at a time.','開啟智慧分組 →':'Open Smart Groups →',
  '讓隨機的事，變成開心的事。':'Make random moments happy moments.',
  '編輯名單':'Edit Roster','名單名稱':'Roster Name','成員名單':'Members','單欄每行一位；多欄請貼上含標題列的表格':'One member per line; for multiple fields, paste a table with headers',
  '⇧ 匯入 CSV / TXT / Excel':'⇧ Import CSV / TXT / Excel','選擇檔案後可預覽；每一列的所有欄位都會保留。':'Preview after choosing a file; every field in each row is kept.',
  '第一列是欄位標題':'First row contains headers','若檔案沒有表頭，取消勾選即可保留第一列。':'Uncheck this for files without headers so the first row is kept.',
  '結果顯示欄位':'Fields shown in results','只顯示勾選欄位；完整資料會保留於名單，可匯出排序或分組結果。':'Only selected fields are shown. Complete rows are kept for order or group exports.',
  '刪除此名單':'Delete Roster','取消':'Cancel','儲存名單':'Save Roster',
  '側邊欄':'Sidebar','新增名單':'Add roster','調整側邊欄寬度':'Resize sidebar','收合側邊欄':'Collapse sidebar','在新分頁開啟':'Open in a new tab',
  '開啟音效':'Turn on sound','隨機玩法':'Random activities','翻開第一張牌':'Flip the first card','翻開第二張牌':'Flip the second card','翻開第三張牌':'Flip the third card',
  '咕嘎企鵝夥伴':'Guga the penguin pal','關閉':'Close','RandoPal 版本 V0.50':'RandoPal version V0.50',
  '例如：\n王小明\n陳小華\n林小美':'For example:\nAlex\nSam\nTaylor'
};
const staticTranslations={'zh-Hant':{},en:staticEnglish};
export function uiText(chinese){return staticTranslations[language]?.[chinese]??chinese}

const dynamicEnglish={
  storageError:'Could not save. Check your browser storage.',activeRoster:'Currently in use',members:'{count} members',person:'{count} person',people:'{count} people',
  rosterSummary:'{members} members · {columns} fields · Showing {fields}',useInPlayground:'Use in Playground',editRoster:'Edit Roster',
  warmupPal:'Let’s warm up! I’ll pick the next person.',wheelPal:'The wheel is ready. Let’s see where it stops!',cardsPal:'Choose a card and reveal a surprise.',presentPal:'I’ll set the presentation order. Let’s reveal it!',teamsPal:'I’ll make the teams. Meet your new teammates!',
  orderProgressTitle:'Order Progress',groupPlan:'Group Plan',orderProgressDetail:'{count} ordered · {progress}',orderRevealed:'{count} revealed',fullListReady:'Full list is ready',
  groupsMade:'{count} groups created',groupsPlanned:'Planning {count} groups',groupProgressDetail:'{count} members grouped · {progress}',groupsRevealed:'{count} groups revealed',groupOverviewReady:'Group overview is ready',groupBalance:'{count} members; groups will be as even as possible.',
  groupSize:'Group {index}: {count} people',orderPal:'Guga will help set the presentation order!',groupPal:'Guga will help count the members in each group!',
  noPick:'No one picked yet',expandSidebar:'Expand sidebar',emptyRoster:'Empty roster',pickTitle:'Meet today’s lucky pick',orderTitle:'A new presentation order',groupTitle:'Make new teams in a tap',
  orderRevealProgress:'{done} / {total} revealed',groupRevealProgress:'{done} / {total} groups revealed',orderRevealFirst:'Tap to reveal person 1',orderReady:'The order is set. Reveal one by one.',rank:'#{index}',revealNextPerson:'Tap to reveal the next person',allRevealed:'All revealed!',
  groupRevealFirst:'Tap to reveal group 1',groupsReady:'Teams are ready. Reveal group by group.',groupNumber:'Group {index}',groupCard:'Group {index} · {count} people',
  roundComplete:'Everyone has been picked. Reset the round.',picking:'Picking someone lucky…',pickedSub:'It’s {name}!',pickedNote:'🎉 Picked: {name}',pickAgain:'Pick another →',pickedPal:'Yay! {name} was picked!',
  orderDonePal:'The order is ready. Let’s reveal it!',groupDonePal:'Made {count} groups. Meet your new teammates!',
  groupCountLabel:'How many groups',groupSizeLabel:'People per group',groupCountHint:'Split everyone evenly into {count} groups',groupSizeHint:'About {count} people per group',
  copySuccess:'Copied to clipboard',copyError:'Could not copy. Check browser permissions.',newRoster:'New Roster',nameColumn:'Name',column:'Column {index}',editorCount:'{rows} rows · {columns} fields',
  enterRosterName:'Enter a roster name.',needRow:'Add at least one row.',needDisplayColumn:'Select at least one field to show.',rosterSaved:'Roster saved.',rosterDeleted:'Roster deleted.',
  fileType:'Choose a CSV, TXT, or XLSX file.',emptyFile:'The file has no rows to import.',importFailed:'Import failed.',noDataRows:'No data rows. Check the header setting.',importPreview:'Preview: {rows} rows, {columns} fields. Review before saving.',
  backToNormal:'Back to normal view',switchProjection:'Switch presentation mode',soundOn:'Sound on',soundOff:'Sound off',turnOffSound:'Turn off sound',turnOnSound:'Turn on sound',resetDone:'Round reset.',
  orderFile:'random-order',groupFile:'random-groups',orderColumn:'Order',groupColumn:'Group',
  memberName:'Name',demoRoster:'Sample Roster'
};

export function t(key,values={}){
  const source=dynamicTranslations[language]?.[key];
  if(source===undefined)throw new Error(`Missing translation: ${key}`);
  return source.replace(/\{(\w+)\}/g,(_,name)=>String(values[name]??''));
}

const dynamicChinese={
  storageError:'儲存失敗，請確認瀏覽器儲存空間',activeRoster:'目前使用中',members:'{count} 位成員',person:'{count} 位',people:'{count} 位',rosterSummary:'{members} 位成員 · {columns} 個欄位 · 顯示 {fields}',useInPlayground:'帶去遊樂場',editRoster:'編輯名單',
  warmupPal:'先暖暖場！我會幫你抽出下一位。',wheelPal:'轉盤準備好了，看看會停在哪裡！',cardsPal:'挑一張牌，讓驚喜自己出現。',presentPal:'報告順序交給我，逐位揭曉吧！',teamsPal:'隊伍交給我，大家都會有新搭檔。',
  orderProgressTitle:'排序進度',groupPlan:'分組計畫',orderProgressDetail:'{count} 位已排好 · {progress}',orderRevealed:'{count} 位已揭曉',fullListReady:'完整清單已就緒',
  groupsMade:'已分成 {count} 組',groupsPlanned:'預計分成 {count} 組',groupProgressDetail:'{count} 位成員已入組 · {progress}',groupsRevealed:'{count} 組已揭曉',groupOverviewReady:'分組總覽已就緒',groupBalance:'{count} 位成員，每組人數會盡量平均。',
  groupSize:'第 {index} 組 {count} 人',orderPal:'咕嘎幫你安排出場順序！',groupPal:'咕嘎幫你看看每組有幾人！',noPick:'還沒有抽出任何人',expandSidebar:'展開側邊欄',emptyRoster:'空名單',pickTitle:'看看今天的幸運兒',orderTitle:'排出不一樣的順序',groupTitle:'一鍵組成新隊伍',
  orderRevealProgress:'{done} / {total} 位已揭曉',groupRevealProgress:'{done} / {total} 組已揭曉',orderRevealFirst:'點擊揭曉第 1 位',orderReady:'結果已排好，逐位揭曉',rank:'第 {index} 位',revealNextPerson:'點擊揭曉下一位',allRevealed:'全部揭曉完成',
  groupRevealFirst:'點擊揭曉第 1 組',groupsReady:'隊伍已分好，逐組揭曉',groupNumber:'第 {index} 組',groupCard:'第 {index} 組 · {count} 人',
  roundComplete:'這一輪都抽完了，請重設本輪',picking:'正在選出幸運兒…',pickedSub:'就是 {name}！',pickedNote:'🎉 本次抽中：{name}',pickAgain:'再抽一位 →',pickedPal:'耶！這次抽中 {name}！',
  orderDonePal:'順序排好了！準備揭曉吧。',groupDonePal:'分成 {count} 組了，快看看新隊友！',groupCountLabel:'分成幾組',groupSizeLabel:'每組幾人',groupCountHint:'將所有成員平均分成 {count} 組',groupSizeHint:'每組約 {count} 人',
  copySuccess:'已複製到剪貼簿',copyError:'無法複製，請確認瀏覽器權限',newRoster:'新名單',nameColumn:'姓名',column:'欄位 {index}',editorCount:'{rows} 列 · {columns} 欄',
  enterRosterName:'請輸入名單名稱',needRow:'請至少加入一列資料',needDisplayColumn:'請至少選一個顯示欄位',rosterSaved:'名單已儲存',rosterDeleted:'名單已刪除',
  fileType:'請選擇 CSV、TXT 或 XLSX 檔案',emptyFile:'檔案沒有可匯入的資料列',importFailed:'匯入失敗',noDataRows:'沒有資料列，請檢查表頭設定',importPreview:'預覽 {rows} 列、{columns} 欄，請檢查後儲存',
  backToNormal:'返回一般模式',switchProjection:'切換投影模式',soundOn:'音效開',soundOff:'音效關',turnOffSound:'關閉音效',turnOnSound:'開啟音效',resetDone:'本輪已重設',
  orderFile:'隨機排序',groupFile:'隨機分組',orderColumn:'順序',groupColumn:'組別',memberName:'姓名',demoRoster:'示範名單'
};
const dynamicTranslations={'zh-Hant':dynamicChinese,en:dynamicEnglish};
export function translationCatalogComplete(){
  const source=Object.keys(dynamicChinese).sort();
  return LANGUAGES.every(({code})=>{
    const keys=Object.keys(dynamicTranslations[code]||{}).sort();
    return keys.length===source.length&&keys.every((key,index)=>key===source[index]);
  });
}

let staticNodes;
export function translateStatic(){
  if(!staticNodes){
    staticNodes=[];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode,raw=node.nodeValue,trimmed=raw.trim();
      if(trimmed&&Object.hasOwn(staticEnglish,trimmed))staticNodes.push({node,original:raw,type:'text'});
    }
    for(const element of document.querySelectorAll('[aria-label],[title],[placeholder],[alt]'))for(const name of ['aria-label','title','placeholder','alt']){
      const value=element.getAttribute(name);if(value&&Object.hasOwn(staticEnglish,value))staticNodes.push({node:element,original:value,type:name});
    }
  }
  for(const item of staticNodes){
    const translated=uiText(item.original.trim());
    if(item.type==='text')item.node.nodeValue=item.original.replace(item.original.trim(),translated);
    else item.node.setAttribute(item.type,translated);
  }
  document.title=uiText('RandoPal · 讓隨機變得有趣');
}
