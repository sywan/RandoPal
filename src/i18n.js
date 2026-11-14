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
  '小組配對':'Team Matching','讓現有小組互相配對，適合互評提案、交流或競賽。每列是一個小組。':'Match existing teams for peer review, discussion, or contests. Each row is one team.',
  '每對幾組':'Teams per match','配成幾對':'Number of matches','每對約 2 組':'About 2 teams per match',
  '選用小組名單；可匯入含組別編號、組名及其他欄位的 CSV 或 Excel。無法整除時會平均調整，避免單獨一組。':'Choose a team roster. Import CSV or Excel with team number, name, and optional fields. Uneven totals are balanced to avoid a team alone.',
  '呈現方式 · 配對':'Presentation · Matches','▦ 配對總覽':'▦ Match Overview','✦ 逐對揭曉':'✦ Reveal Match by Match',
  '點擊下方按鈕產生配對':'Click below to create matches','尚未產生配對':'No matches yet','產生配對後，點擊揭曉':'Create matches, then tap to reveal','每次揭曉一對':'Reveal one match at a time','開始配對':'Create matches',
  '預計配成 0 對':'Planning 0 matches','選擇至少兩組開始配對。':'Add at least two teams to start matching.',
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
  '小組互評':'Peer Review','將現有小組配對，互相交流或審查作品。':'Match existing teams to exchange ideas or review each other’s work.','開啟小組配對 →':'Open Team Matching →',
  '讓隨機的事，變成開心的事。':'Make random moments happy moments.',
  '編輯名單':'Edit Roster','名單名稱':'Roster Name','成員名單':'Members','單欄每行一位；多欄請貼上含標題列的表格':'One member per line; for multiple fields, paste a table with headers',
  '名單對象':'Roster type','個人名單':'People','小組名單':'Teams',
  '⇧ 匯入 CSV / TXT / Excel':'⇧ Import CSV / TXT / Excel','選擇檔案後可預覽；每一列的所有欄位都會保留。':'Preview after choosing a file; every field in each row is kept.',
  '第一列是欄位標題':'First row contains headers','若檔案沒有表頭，取消勾選即可保留第一列。':'Uncheck this for files without headers so the first row is kept.',
  '結果顯示欄位':'Fields shown in results','只顯示勾選欄位；完整資料會保留於名單，匯出排序、分組或配對結果時會一併保留。':'Only selected fields are shown. Complete rows are included when exporting order, grouping, or matching results.',
  '刪除此名單':'Delete Roster','取消':'Cancel','儲存名單':'Save Roster',
  '側邊欄':'Sidebar','新增名單':'Add roster','調整側邊欄寬度':'Resize sidebar','收合側邊欄':'Collapse sidebar','在新分頁開啟':'Open in a new tab',
  '開啟音效':'Turn on sound','隨機玩法':'Random activities','翻開第一張牌':'Flip the first card','翻開第二張牌':'Flip the second card','翻開第三張牌':'Flip the third card',
  '咕嘎企鵝夥伴':'Guga the penguin pal','關閉':'Close','繁體中文':'Traditional Chinese','RandoPal 版本 V0.57':'RandoPal version V0.57',
  '例如：\n王小明\n陳小華\n林小美':'For example:\nAlex\nSam\nTaylor'
};
Object.assign(staticEnglish,{
  '選擇玩法':'Choose an activity','依情境找玩法':'Browse by moment','7 種玩法':'7 activities','玩法分類':'Activity categories','分類中的玩法':'Activities in category',
  '任務盲盒':'Challenge Draw','角色輪盤':'Role Shuffle','互評巡迴':'Review Circuit',
  '從任務卡庫抽出下一個挑戰。每列是一張卡；可匯入題目、提示、難度等欄位。':'Draw the next challenge from a task deck. Each row is a card; import prompts, hints, difficulty, and more.',
  '準備開箱':'Ready to open a challenge','按下按鈕，看看這次要挑戰什麼！':'Tap below to reveal your next challenge!','抽一張任務卡':'Draw a challenge',
  '從角色卡庫抽出角色，分派給不同的人或小組。重新分派時會盡量避開上一輪相同的角色。':'Assign unique roles to people or teams. A new draw tries to avoid repeating the last assignments.',
  '分派對象':'Assign to','個人':'People','小組':'Teams','角色卡庫':'Role deck','編輯角色卡':'Edit role deck','每張角色卡只會使用一次。':'Each role card is used once per draw.',
  '點擊下方按鈕分派角色':'Tap below to assign roles','開始角色輪盤':'Assign roles',
  '安排多輪互評：每組在每輪評一組，不評自己，也不會在可用輪數內重複評同一組。':'Plan review rounds. Each team reviews one other team per round, never itself or the same team twice within the available rounds.',
  '進行幾輪':'Number of rounds','最多 7 輪不重複':'Up to 7 unique rounds','呈現方式 · 互評':'Presentation · Reviews','▦ 全部輪次':'▦ All Rounds','✦ 逐輪揭曉':'✦ Reveal by Round',
  '點擊下方按鈕產生互評路線':'Tap below to create a review circuit','尚未產生互評路線':'No review circuit yet','產生後，逐輪揭曉':'Create a circuit, then reveal rounds','每次揭曉一輪':'Reveal one round at a time','產生互評路線':'Create review circuit',
  '任務卡庫':'Task deck','抽出下一個任務，替活動加入驚喜。':'Draw a new challenge to add surprise to your activity.','開啟任務盲盒 →':'Open Challenge Draw →',
  '把主持、記錄等角色隨機分派。':'Randomly assign host, note taker, and other roles.','開啟角色輪盤 →':'Open Role Shuffle →',
  '安排多輪不重複的小組互評路線。':'Plan multiple team review rounds without repeat partners.','開啟互評巡迴 →':'Open Review Circuit →',
  '只顯示勾選欄位；完整資料會保留於名單，匯出結果時會一併保留。':'Only selected fields are shown. Complete rows are kept in the roster and included in exported results.',
  'RandoPal 版本 V0.58':'RandoPal version V0.58'
});
const staticTranslations={'zh-Hant':{},en:staticEnglish};
export function uiText(chinese){return staticTranslations[language]?.[chinese]??chinese}

const dynamicEnglish={
  storageError:'Could not save. Check your browser storage.',activeRoster:'Currently in use',members:'{count} members',person:'{count} person',people:'{count} people',
  teams:'{count} teams',teamRosterSummary:'{members} teams · {columns} fields · Showing {fields}',demoTeamRoster:'Sample Team Roster',teamIdColumn:'Team number',teamNameColumn:'Team name',sampleTeamName:'Team {index}',
  rosterSummary:'{members} members · {columns} fields · Showing {fields}',useInPlayground:'Use in Playground',editRoster:'Edit Roster',
  warmupPal:'Let’s warm up! I’ll pick the next person.',wheelPal:'The wheel is ready. Let’s see where it stops!',cardsPal:'Choose a card and reveal a surprise.',presentPal:'I’ll set the presentation order. Let’s reveal it!',teamsPal:'I’ll make the teams. Meet your new teammates!',
  peerPal:'I’ll match the existing teams for peer review!',
  orderProgressTitle:'Order Progress',groupPlan:'Group Plan',orderProgressDetail:'{count} ordered · {progress}',orderRevealed:'{count} revealed',fullListReady:'Full list is ready',
  groupsMade:'{count} groups created',groupsPlanned:'Planning {count} groups',groupProgressDetail:'{count} members grouped · {progress}',groupsRevealed:'{count} groups revealed',groupOverviewReady:'Group overview is ready',groupBalance:'{count} members; groups will be as even as possible.',
  groupSize:'Group {index}: {count} people',orderPal:'Guga will help set the presentation order!',groupPal:'Guga will help count the members in each group!',
  pairPlan:'Match Plan',pairsMade:'{count} matches created',pairsMadeOne:'1 match created',pairsPlanned:'Planning {count} matches',pairsPlannedOne:'Planning 1 match',pairProgressDetail:'{count} teams matched · {progress}',pairsRevealed:'{count} matches revealed',pairsRevealedOne:'1 match revealed',pairOverviewReady:'Match overview is ready',pairPlanHint:'{count} matches · {min}–{max} teams each',pairPlanHintOne:'1 match · {min}–{max} teams',pairSize:'Match {index}: {count} teams',pairPal:'Guga will match the teams!',needTwoTeams:'Add at least two teams to make a match.',pairTitle:'Match existing teams',
  noPick:'No one picked yet',expandSidebar:'Expand sidebar',emptyRoster:'Empty roster',pickTitle:'Meet today’s lucky pick',orderTitle:'A new presentation order',groupTitle:'Make new teams in a tap',
  orderRevealProgress:'{done} / {total} revealed',groupRevealProgress:'{done} / {total} groups revealed',orderRevealFirst:'Tap to reveal person 1',orderReady:'The order is set. Reveal one by one.',rank:'#{index}',revealNextPerson:'Tap to reveal the next person',allRevealed:'All revealed!',
  groupRevealFirst:'Tap to reveal group 1',groupsReady:'Teams are ready. Reveal group by group.',groupNumber:'Group {index}',groupCard:'Group {index} · {count} people',
  pairRevealProgress:'{done} / {total} matches revealed',pairRevealProgressOne:'{done} / 1 match revealed',pairRevealFirst:'Tap to reveal match 1',pairsReady:'Matches are ready. Reveal one by one.',pairNumber:'Match {index}',pairCard:'Match {index} · {count} teams',
  roundComplete:'Everyone has been picked. Reset the round.',picking:'Picking someone lucky…',pickedSub:'It’s {name}!',pickedNote:'🎉 Picked: {name}',pickAgain:'Pick another →',pickedPal:'Yay! {name} was picked!',
  orderDonePal:'The order is ready. Let’s reveal it!',groupDonePal:'Made {count} groups. Meet your new teammates!',
  pairDonePal:'Made {count} matches. Let’s see which teams meet!',pairDonePalOne:'Made 1 match. Let’s see which teams meet!',pairCountLabel:'How many matches',pairSizeLabel:'Teams per match',
  groupCountLabel:'How many groups',groupSizeLabel:'People per group',groupCountHint:'Split everyone evenly into {count} groups',groupSizeHint:'About {count} people per group',
  copySuccess:'Copied to clipboard',copyError:'Could not copy. Check browser permissions.',newRoster:'New Roster',nameColumn:'Name',column:'Column {index}',editorCount:'{rows} rows · {columns} fields',
  newTeamRoster:'New Team Roster',editorTeamCount:'{rows} teams · {columns} fields',teamRowsLabel:'Team roster',personRowsLabel:'Members',teamRowsHelp:'One team per line; paste a table with headers for more fields',personRowsHelp:'One member per line; paste a table with headers for more fields',teamRowsPlaceholder:'For example:\nTeam 1\nTeam 2\nTeam 3',personRowsPlaceholder:'For example:\nAlex\nSam\nTaylor',
  enterRosterName:'Enter a roster name.',needRow:'Add at least one row.',needDisplayColumn:'Select at least one field to show.',rosterSaved:'Roster saved.',rosterDeleted:'Roster deleted.',
  fileType:'Choose a CSV, TXT, or XLSX file.',emptyFile:'The file has no rows to import.',importFailed:'Import failed.',noDataRows:'No data rows. Check the header setting.',importPreview:'Preview: {rows} rows, {columns} fields. Review before saving.',
  backToNormal:'Back to normal view',switchProjection:'Switch presentation mode',soundOn:'Sound on',soundOff:'Sound off',turnOffSound:'Turn off sound',turnOnSound:'Turn on sound',resetDone:'Round reset.',
  orderFile:'random-order',groupFile:'random-groups',orderColumn:'Order',groupColumn:'Group',
  pairFile:'team-matches',pairColumn:'Match',
  memberName:'Name',demoRoster:'Sample Roster'
};

export function t(key,values={}){
  const source=dynamicTranslations[language]?.[key];
  if(source===undefined)throw new Error(`Missing translation: ${key}`);
  return source.replace(/\{(\w+)\}/g,(_,name)=>String(values[name]??''));
}

const dynamicChinese={
  storageError:'儲存失敗，請確認瀏覽器儲存空間',activeRoster:'目前使用中',members:'{count} 位成員',person:'{count} 位',people:'{count} 位',rosterSummary:'{members} 位成員 · {columns} 個欄位 · 顯示 {fields}',useInPlayground:'帶去遊樂場',editRoster:'編輯名單',
  teams:'{count} 組',teamRosterSummary:'{members} 組 · {columns} 個欄位 · 顯示 {fields}',demoTeamRoster:'示範小組名單',teamIdColumn:'組別編號',teamNameColumn:'組名',sampleTeamName:'第 {index} 組',
  warmupPal:'先暖暖場！我會幫你抽出下一位。',wheelPal:'轉盤準備好了，看看會停在哪裡！',cardsPal:'挑一張牌，讓驚喜自己出現。',presentPal:'報告順序交給我，逐位揭曉吧！',teamsPal:'隊伍交給我，大家都會有新搭檔。',
  peerPal:'現有小組交給我配對，準備互相交流吧！',
  orderProgressTitle:'排序進度',groupPlan:'分組計畫',orderProgressDetail:'{count} 位已排好 · {progress}',orderRevealed:'{count} 位已揭曉',fullListReady:'完整清單已就緒',
  groupsMade:'已分成 {count} 組',groupsPlanned:'預計分成 {count} 組',groupProgressDetail:'{count} 位成員已入組 · {progress}',groupsRevealed:'{count} 組已揭曉',groupOverviewReady:'分組總覽已就緒',groupBalance:'{count} 位成員，每組人數會盡量平均。',
  groupSize:'第 {index} 組 {count} 人',orderPal:'咕嘎幫你安排出場順序！',groupPal:'咕嘎幫你看看每組有幾人！',noPick:'還沒有抽出任何人',expandSidebar:'展開側邊欄',emptyRoster:'空名單',pickTitle:'看看今天的幸運兒',orderTitle:'排出不一樣的順序',groupTitle:'一鍵組成新隊伍',
  pairPlan:'配對計畫',pairsMade:'已配成 {count} 對',pairsMadeOne:'已配成 1 對',pairsPlanned:'預計配成 {count} 對',pairsPlannedOne:'預計配成 1 對',pairProgressDetail:'{count} 組已配對 · {progress}',pairsRevealed:'{count} 對已揭曉',pairsRevealedOne:'1 對已揭曉',pairOverviewReady:'配對總覽已就緒',pairPlanHint:'預計 {count} 對，每對 {min}–{max} 組',pairPlanHintOne:'預計 1 對，包含 {min}–{max} 組',pairSize:'第 {index} 對 {count} 組',pairPal:'咕嘎幫你配對現有小組！',needTwoTeams:'請至少加入兩個小組才能配對',pairTitle:'讓現有小組找到搭檔',
  orderRevealProgress:'{done} / {total} 位已揭曉',groupRevealProgress:'{done} / {total} 組已揭曉',orderRevealFirst:'點擊揭曉第 1 位',orderReady:'結果已排好，逐位揭曉',rank:'第 {index} 位',revealNextPerson:'點擊揭曉下一位',allRevealed:'全部揭曉完成',
  groupRevealFirst:'點擊揭曉第 1 組',groupsReady:'隊伍已分好，逐組揭曉',groupNumber:'第 {index} 組',groupCard:'第 {index} 組 · {count} 人',
  pairRevealProgress:'{done} / {total} 對已揭曉',pairRevealProgressOne:'{done} / 1 對已揭曉',pairRevealFirst:'點擊揭曉第 1 對',pairsReady:'配對已完成，逐對揭曉',pairNumber:'第 {index} 對',pairCard:'第 {index} 對 · {count} 組',
  roundComplete:'這一輪都抽完了，請重設本輪',picking:'正在選出幸運兒…',pickedSub:'就是 {name}！',pickedNote:'🎉 本次抽中：{name}',pickAgain:'再抽一位 →',pickedPal:'耶！這次抽中 {name}！',
  orderDonePal:'順序排好了！準備揭曉吧。',groupDonePal:'分成 {count} 組了，快看看新隊友！',groupCountLabel:'分成幾組',groupSizeLabel:'每組幾人',groupCountHint:'將所有成員平均分成 {count} 組',groupSizeHint:'每組約 {count} 人',
  pairDonePal:'配成 {count} 對了，看看哪些小組相遇！',pairDonePalOne:'配成 1 對了，看看哪些小組相遇！',pairCountLabel:'配成幾對',pairSizeLabel:'每對幾組',
  copySuccess:'已複製到剪貼簿',copyError:'無法複製，請確認瀏覽器權限',newRoster:'新名單',nameColumn:'姓名',column:'欄位 {index}',editorCount:'{rows} 列 · {columns} 欄',
  newTeamRoster:'新小組名單',editorTeamCount:'{rows} 組 · {columns} 欄',teamRowsLabel:'小組名單',personRowsLabel:'成員名單',teamRowsHelp:'每行一組；多欄請貼上含標題列的表格',personRowsHelp:'單欄每行一位；多欄請貼上含標題列的表格',teamRowsPlaceholder:'例如：\n第一組\n第二組\n第三組',personRowsPlaceholder:'例如：\n王小明\n陳小華\n林小美',
  enterRosterName:'請輸入名單名稱',needRow:'請至少加入一列資料',needDisplayColumn:'請至少選一個顯示欄位',rosterSaved:'名單已儲存',rosterDeleted:'名單已刪除',
  fileType:'請選擇 CSV、TXT 或 XLSX 檔案',emptyFile:'檔案沒有可匯入的資料列',importFailed:'匯入失敗',noDataRows:'沒有資料列，請檢查表頭設定',importPreview:'預覽 {rows} 列、{columns} 欄，請檢查後儲存',
  backToNormal:'返回一般模式',switchProjection:'切換投影模式',soundOn:'音效開',soundOff:'音效關',turnOffSound:'關閉音效',turnOnSound:'開啟音效',resetDone:'本輪已重設',
  orderFile:'隨機排序',groupFile:'隨機分組',orderColumn:'順序',groupColumn:'組別',memberName:'姓名',demoRoster:'示範名單',pairFile:'小組配對',pairColumn:'配對'
};
const dynamicTranslations={'zh-Hant':dynamicChinese,en:dynamicEnglish};
Object.assign(dynamicEnglish,{
  quickCategory:'Quick moments',planCategory:'Plan the flow',exchangeCategory:'Team exchange',activityCount:'{count} activities',
  pickActivity:'Random Pick',orderActivity:'Random Order',groupActivity:'Smart Groups',pairActivity:'Team Matching',taskActivity:'Challenge Draw',roleActivity:'Role Shuffle',reviewActivity:'Review Circuit',
  pickActivityHint:'Pick one person',orderActivityHint:'Set a speaking order',groupActivityHint:'Make new groups',pairActivityHint:'Match existing teams',taskActivityHint:'Reveal a task card',roleActivityHint:'Assign unique roles',reviewActivityHint:'Plan peer review rounds',
  tasks:'{count} cards',roles:'{count} roles',taskRosterSummary:'{members} cards · {columns} fields · Showing {fields}',roleRosterSummary:'{members} roles · {columns} fields · Showing {fields}',
  demoTaskRoster:'Sample Challenge Deck',demoRoleRoster:'Sample Role Deck',taskColumn:'Challenge',taskHintColumn:'Hint',roleColumn:'Role',
  taskTitle:'Open the next challenge',roleTitle:'Everyone gets a role',reviewTitle:'Plan a review circuit',taskPal:'Guga has a surprise challenge!',rolePal:'Guga will assign the roles!',reviewPal:'Guga will plan the reviews!',
  taskPlan:'Challenge Deck',rolePlan:'Role Plan',reviewPlan:'Review Circuit',taskLeft:'{count} cards left this round',taskDone:'{count} cards drawn this round',roleReady:'{roles} roles for {targets} targets',roleDone:'{count} roles assigned',reviewReady:'{rounds} rounds for {teams} teams',reviewDone:'{rounds} rounds ready',
  taskHint:'Draw without repeats or allow a card to return to the deck.',roleHint:'{roles} of {targets} targets will receive one role each.',reviewHint:'Up to {count} unique rounds with this roster.',
  taskEmpty:'All cards have been drawn. Reset this round or turn off exclusion.',taskPickedPal:'Challenge revealed: {name}!',taskReset:'Challenge round reset.',roleAssignedPal:'Roles assigned! Meet the new team.',reviewAssignedPal:'The review circuit is ready!',
  taskHistoryTitle:'Drawn this round',roleTargetColumn:'Assigned to',roleFile:'role-assignments',taskFile:'challenge-draws',reviewFile:'review-circuit',reviewRoundColumn:'Round',reviewerColumn:'Reviewer',revieweeColumn:'Reviews',
  reviewRound:'Round {index}',reviewRoundCount:'{count} assignments',reviewRevealProgress:'{done} / {total} rounds revealed',reviewRevealFirst:'Tap to reveal round 1',reviewReadyText:'Circuit ready. Reveal one round at a time.',reviewLink:'{from} → {to}',
  needReviewTeams:'Add at least two teams to plan reviews.',needRoleTargets:'Add at least one target and one role card.',
  newTaskRoster:'New Challenge Deck',newRoleRoster:'New Role Deck',taskRowsLabel:'Challenge cards',roleRowsLabel:'Role cards',taskRowsHelp:'One challenge per line; use headers for more fields',roleRowsHelp:'One role per line; use headers for more fields',taskRowsPlaceholder:'For example:\nSketch your idea\nAsk three questions',roleRowsPlaceholder:'For example:\nHost\nNote taker\nTimekeeper',taskEditorCount:'{rows} cards · {columns} fields',roleEditorCount:'{rows} roles · {columns} fields',
  challengePal:'Open a challenge card!',rolesPal:'Shuffle the roles!',circuitPal:'Plan several review rounds!'
});
Object.assign(dynamicChinese,{
  quickCategory:'快速暖場',planCategory:'安排流程',exchangeCategory:'團隊交流',activityCount:'{count} 種玩法',
  pickActivity:'隨機抽選',orderActivity:'隨機排序',groupActivity:'智慧分組',pairActivity:'小組配對',taskActivity:'任務盲盒',roleActivity:'角色輪盤',reviewActivity:'互評巡迴',
  pickActivityHint:'抽出一位幸運兒',orderActivityHint:'排好出場順序',groupActivityHint:'組成新隊伍',pairActivityHint:'配對現有小組',taskActivityHint:'揭曉任務卡',roleActivityHint:'分派不同角色',reviewActivityHint:'安排多輪互評',
  tasks:'{count} 張卡',roles:'{count} 個角色',taskRosterSummary:'{members} 張卡 · {columns} 欄 · 顯示 {fields}',roleRosterSummary:'{members} 個角色 · {columns} 欄 · 顯示 {fields}',
  demoTaskRoster:'示範任務卡',demoRoleRoster:'示範角色卡',taskColumn:'任務',taskHintColumn:'提示',roleColumn:'角色',
  taskTitle:'開出下一個驚喜任務',roleTitle:'讓每個角色找到主人',reviewTitle:'安排互評巡迴路線',taskPal:'咕嘎有一張驚喜任務卡！',rolePal:'咕嘎幫大家分派角色！',reviewPal:'咕嘎幫你安排互評！',
  taskPlan:'任務卡庫',rolePlan:'角色分派',reviewPlan:'互評巡迴',taskLeft:'本輪剩下 {count} 張卡',taskDone:'本輪已抽 {count} 張卡',roleReady:'{roles} 個角色、{targets} 個對象',roleDone:'已分派 {count} 個角色',reviewReady:'{teams} 組安排 {rounds} 輪',reviewDone:'已安排 {rounds} 輪',
  taskHint:'可選擇抽過即排除，或讓卡片繼續留在卡庫。',roleHint:'從 {targets} 個對象中選出 {roles} 個，各獲得一個角色。',reviewHint:'這份名單最多可安排 {count} 輪不重複互評。',
  taskEmpty:'本輪任務卡已抽完；請重設本輪或關閉排除。',taskPickedPal:'開箱成功：{name}！',taskReset:'任務本輪已重設',roleAssignedPal:'角色分派好了，快看看新職責！',reviewAssignedPal:'互評路線排好了！',
  taskHistoryTitle:'本輪已抽出',roleTargetColumn:'分派給',roleFile:'角色分派',taskFile:'任務抽籤',reviewFile:'互評巡迴',reviewRoundColumn:'輪次',reviewerColumn:'評審組',revieweeColumn:'受評組',
  reviewRound:'第 {index} 輪',reviewRoundCount:'{count} 個互評安排',reviewRevealProgress:'已揭曉 {done} / {total} 輪',reviewRevealFirst:'點擊揭曉第 1 輪',reviewReadyText:'路線已排好，逐輪揭曉',reviewLink:'{from} → {to}',
  needReviewTeams:'請至少加入兩個小組才能安排互評',needRoleTargets:'請至少加入一個對象與一張角色卡',
  newTaskRoster:'新任務卡庫',newRoleRoster:'新角色卡庫',taskRowsLabel:'任務卡',roleRowsLabel:'角色卡',taskRowsHelp:'單欄每行一項；多欄請貼上含標題列的表格',roleRowsHelp:'每行一個角色；多欄請貼上含標題列的表格',taskRowsPlaceholder:'例如：\n畫出你的想法\n提出三個問題',roleRowsPlaceholder:'例如：\n主持人\n記錄員\n計時員',taskEditorCount:'{rows} 張卡 · {columns} 欄',roleEditorCount:'{rows} 個角色 · {columns} 欄',
  challengePal:'來開一張任務卡吧！',rolesPal:'讓大家換個角色！',circuitPal:'安排多輪的互評！'
});
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
