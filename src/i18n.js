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
Object.assign(staticEnglish,{
  'RandoPal 版本 V0.59':'RandoPal version V0.59','10 種玩法':'10 activities',
  '創意混搭':'Idea Mixer','驚喜事件卡':'Twist Cards','話題賓果':'Conversation Bingo',
  '把兩副卡庫隨機組合，產生意想不到的題目或創作方式。':'Combine two decks to make unexpected prompts and creative formats.',
  '主題卡庫':'Topic deck','形式卡庫':'Format deck','管理卡庫':'Manage decks','主題':'Topic','形式':'Format','每一種組合在本輪只出現一次。':'Each combination appears once per round.','產生創意組合':'Create idea mix','重設組合':'Reset combinations',
  '活動進行到一半時，抽一張突發事件卡，讓大家換個角度應變。':'Draw an unexpected event during an activity and adapt your approach.',
  '事件卡庫':'Event deck','準備迎接驚喜':'Ready for a twist','抽出一個新條件，繼續挑戰！':'Draw a new constraint and keep going!','本輪不會重複抽到同一張事件卡。':'Event cards do not repeat in a round.','抽一張事件卡':'Draw an event card',
  '從話題卡庫產生一張賓果卡，完成話題後點選格子；同一張卡不會出現重複題目。':'Build a bingo card from conversation prompts. Mark completed squares; prompts do not repeat on a card.',
  '話題卡庫':'Conversation deck','賓果尺寸':'Bingo size','至少需要 9 張話題卡。':'At least 9 conversation cards are needed.','話題賓果':'Conversation Bingo','選好尺寸後產生賓果卡':'Choose a size and generate a bingo card','產生賓果卡':'Generate bingo card','清除標記':'Clear marks','列印':'Print',
  '主題加形式，碰撞一個新點子。':'Pair a topic and format to spark a new idea.','開啟創意混搭 →':'Open Idea Mixer →',
  '活動中途加入一個意外條件。':'Add a surprise constraint during an activity.','開啟驚喜事件卡 →':'Open Twist Cards →',
  '用話題卡促成交流，完成一條線。':'Start conversations and complete a line.','開啟話題賓果 →':'Open Conversation Bingo →',
  '產生創意組合 →':'Create idea mix →','抽一張事件卡 →':'Draw an event card →','重設本輪':'Reset round','產生賓果卡 →':'Generate bingo card →'
});
Object.assign(dynamicEnglish,{
  creativeCategory:'Card creativity',mixerActivity:'Idea Mixer',twistActivity:'Twist Cards',bingoActivity:'Conversation Bingo',mixerActivityHint:'Combine two decks',twistActivityHint:'Reveal a surprise constraint',bingoActivityHint:'Complete a conversation line',
  mixerTitle:'Mix a new idea',twistTitleMain:'Add a surprise twist',bingoTitle:'Get the conversation going',
  demoTopics:'Sample Topic Deck',demoFormats:'Sample Format Deck',demoTwists:'Sample Twist Deck',demoBingo:'Sample Bingo Deck',topicColumn:'Topic',formatColumn:'Format',eventColumn:'Event',promptColumn:'Prompt',
  mixerRemaining:'Combinations left',mixerUsed:'{count} combinations created',mixerHint:'{left} of {total} combinations left this round.',mixerEmpty:'All combinations have appeared. Reset to play again.',mixerPal:'Guga found a new idea mix!',mixerFile:'idea-mixes',
  twistRemaining:'Event cards left',twistUsed:'{count} events drawn',twistHint:'{left} event cards left this round.',twistEmpty:'All event cards have been drawn. Reset the round.',twistReady:'Ready for a twist',twistReadyHint:'Draw a new constraint and keep going!',twistPal:'Guga has a surprise twist!',twistFile:'twist-cards',
  bingoMarked:'Squares marked',bingoCardCount:'{count} prompts on this card',bingoNeed:'Need {count} cards; this deck has {available}.',bingoReady:'Choose a size and generate a bingo card',bingoProgress:'{marked} / {total} marked · {lines} complete lines',bingoPal:'Guga prepared a conversation bingo card!',bingoFile:'conversation-bingo',bingoRowColumn:'Row',bingoColColumn:'Column',bingoMarkedColumn:'Marked',yes:'Yes',no:'No'
});
Object.assign(dynamicChinese,{
  creativeCategory:'卡片創意',mixerActivity:'創意混搭',twistActivity:'驚喜事件卡',bingoActivity:'話題賓果',mixerActivityHint:'組合兩副卡庫',twistActivityHint:'抽出意外條件',bingoActivityHint:'聊出一條賓果線',
  mixerTitle:'碰撞出一個新點子',twistTitleMain:'加入一個驚喜轉折',bingoTitle:'讓話題自然展開',
  demoTopics:'創意主題卡',demoFormats:'創意形式卡',demoTwists:'驚喜事件卡',demoBingo:'話題賓果卡',topicColumn:'主題',formatColumn:'形式',eventColumn:'事件',promptColumn:'話題',
  mixerRemaining:'剩餘組合',mixerUsed:'已產生 {count} 組',mixerHint:'本輪還有 {left} / {total} 種組合。',mixerEmpty:'所有組合都出現過了，請重設後再玩。',mixerPal:'咕嘎幫你碰撞出新點子！',mixerFile:'創意混搭',
  twistRemaining:'剩餘事件卡',twistUsed:'已抽出 {count} 張事件卡',twistHint:'本輪還剩 {left} 張事件卡。',twistEmpty:'事件卡已抽完，請重設本輪。',twistReady:'準備迎接驚喜',twistReadyHint:'抽出一個新條件，繼續挑戰！',twistPal:'咕嘎帶來一張驚喜事件卡！',twistFile:'驚喜事件卡',
  bingoMarked:'已標記格數',bingoCardCount:'這張卡有 {count} 個話題',bingoNeed:'需要 {count} 張話題卡；目前卡庫有 {available} 張。',bingoReady:'選好尺寸後產生賓果卡',bingoProgress:'已標記 {marked} / {total} 格 · 完成 {lines} 條線',bingoPal:'咕嘎準備好話題賓果卡！',bingoFile:'話題賓果',bingoRowColumn:'列',bingoColColumn:'欄',bingoMarkedColumn:'已標記',yes:'是',no:'否'
});
Object.assign(staticEnglish,{
  'RandoPal 版本 V0.60':'RandoPal version V0.60','12 種玩法':'12 activities','玩法說明':'How to play',
  '安排多輪換桌交流，讓參與者每輪遇見不同的人；跨批次記錄會降低重複搭檔。':'Plan table changes across rounds so people meet new partners. Past rounds help reduce repeat pairings.',
  '每桌人數':'People per table','產生輪數':'Rounds to add','每輪都會安排全部成員，並盡量減少重複搭檔。':'Everyone joins every round, with fewer repeat partners where possible.',
  '▦ 全部輪次':'▦ All rounds','✦ 逐輪揭曉':'✦ Reveal by round','點擊下方按鈕產生換桌路線':'Generate a table rotation below','尚未產生路線':'No route yet','揭曉下一輪':'Reveal next round','產生換桌路線 →':'Generate table rotation →','清除換桌紀錄':'Clear table history',
  '依照過去被選中的次數，優先讓輪值較少的人或小組上場；記錄會保存在這個瀏覽器。':'Use previous pick counts to give people or teams with fewer turns priority. History stays in this browser.',
  '輪值對象':'Select from','準備輪到誰？':'Who is next?','按下按鈕，公平選出下一位。':'Tap below to pick the next turn fairly.','先從被選次數最少的對象抽選。':'Start with the people or teams selected least often.','選出下一位 →':'Pick next turn →','清除輪值紀錄':'Clear turn history',
  '換桌交流':'Mixer Rounds','公平輪值':'Fair Turn','跨輪換桌，讓大家盡量遇到新搭檔。':'Change tables to help everyone meet new partners.','開啟換桌交流 →':'Open Mixer Rounds →','優先選出輪值次數較少的成員。':'Give priority to people with fewer turns.','開啟公平輪值 →':'Open Fair Turn →'
});
Object.assign(dynamicEnglish,{
  fairCategory:'Fair rotation',roundsActivity:'Mixer Rounds',turnActivity:'Fair Turn',roundsActivityHint:'Meet new partners each round',turnActivityHint:'Share turns more evenly',roundsTitle:'Meet new people each round',turnTitle:'Share the next turn fairly',
  previewActivity:'Preview {name}',showActivityHelp:'How to play {name}',
  pickHelp:'Choose a roster, then pick one person by slot machine, wheel, or cards. Turn on exclusion to avoid picking them again this round.',
  taskHelp:'Choose or import a challenge deck. Draw one card at a time; exclude drawn cards or reset the deck for another round.',
  orderHelp:'Choose a people roster and shuffle it into a speaking order. Show the whole list or reveal one person at a time.',
  groupHelp:'Choose how many groups you need or how many people per group. Everyone is assigned once, with sizes kept as even as possible.',
  roleHelp:'Choose people or teams and a role deck. Unique roles are assigned randomly; another draw tries to change the last assignments.',
  pairHelp:'Choose an existing team roster, then set teams per match or the number of matches. Whole teams stay together, including when totals are uneven.',
  reviewHelp:'Choose existing teams and the number of rounds. Each team reviews one other team per round, without reviewing itself or repeating a target.',
  mixerHelp:'Choose a topic deck and a format deck. Draw a new pairing each time; the same combination will not repeat until you reset.',
  twistHelp:'Choose an event deck and draw a surprise constraint during an activity. Cards do not repeat until you reset the round.',
  bingoHelp:'Choose a conversation deck and 3×3, 4×4, or 5×5 size. Generate unique squares, mark completed conversations, then print or export the card.',
  roundsHelp:'Choose a people roster, table size, and rounds to add. Each new round uses saved encounter history to reduce repeat partners; reveal rounds or clear history.',
  turnHelp:'Choose a people or team roster and pick the next turn. Those with the fewest past turns get priority; history survives reopening and can be cleared.',
  roundsStored:'Rounds saved',roundsCurrent:'{count} rounds in this roster',roundsPal:'Guga planned new table partners!',roundsHistory:'{count} rounds saved for this roster. New rounds use this history.',roundsReady:'Generate a table rotation below',roundsReadyShort:'No rounds generated yet',roundsProgress:'{shown} / {total} rounds revealed',rotationRound:'Round {index}',rotationTable:'Table {index} · {count} people',needRotationPeople:'Add at least two people for table rotation.',roundsReset:'Table rotation history cleared.',roundsFile:'table-rotation',rotationTableColumn:'Table',
  turnRecorded:'Turns recorded',turnPeople:'{count} people or teams can take turns',turnPal:'It is {name}’s turn!',turnContextPal:'Guga is keeping turns fair!',turnReady:'Who is next?',turnReadyHint:'Tap below to pick the next turn fairly.',turnLast:'Turn {count} was just selected.',turnFirstHint:'Everyone starts with zero turns.',turnSummary:'{count} turns · each person has {min}–{max} picks',turnSummaryOne:'1 turn · each person has {min}–{max} picks',turnTimes:'{count} turns',turnOnce:'1 turn',needTurnTargets:'Add at least one person or team.',turnReset:'Turn history cleared.',turnFile:'fair-turns',turnCountColumn:'Times selected'
});
Object.assign(dynamicChinese,{
  fairCategory:'公平輪換',roundsActivity:'換桌交流',turnActivity:'公平輪值',roundsActivityHint:'每輪遇見新搭檔',turnActivityHint:'讓輪值機會更平均',roundsTitle:'每一輪都遇見新夥伴',turnTitle:'公平選出下一位',
  previewActivity:'預覽「{name}」玩法',showActivityHelp:'「{name}」怎麼玩',
  pickHelp:'選一份名單，用跑馬燈、轉盤或翻牌抽出一人。開啟「抽過即排除」，本輪就不會重複抽到。',
  taskHelp:'選擇或匯入任務卡庫，一次抽出一張挑戰卡。可排除已抽卡片，也可重設卡庫再玩一輪。',
  orderHelp:'選一份個人名單，打散成出場順序。可以直接看完整清單，也可以逐位揭曉。',
  groupHelp:'設定要分幾組，或每組幾人。每人只分到一組，各組人數會盡量平均。',
  roleHelp:'選擇個人或小組，再選角色卡庫。每張角色卡只分派一次，重抽時會盡量換掉上一輪的配置。',
  pairHelp:'使用現有小組名單，設定每對幾組或要配成幾對。原有小組不會拆散，奇數時也會平均安排。',
  reviewHelp:'選現有小組和輪數。每組每輪評另一組，不評自己，也不重複評同一個對象。',
  mixerHelp:'選主題與形式兩副卡庫，每次隨機組成一個新題目。同一個組合本輪不會重複，重設後可再玩。',
  twistHelp:'選事件卡庫，在活動中途抽一個突發條件。卡片本輪不重複，抽完可重設。',
  bingoHelp:'選話題卡庫和 3×3、4×4 或 5×5 尺寸。產生不重複的格子，聊完就標記，也可列印或匯出。',
  roundsHelp:'選個人名單、每桌人數和新增輪數。新一輪會參考已存的交流紀錄，減少重複搭檔；可逐輪揭曉或清除紀錄。',
  turnHelp:'選個人或小組名單，抽出下一位。被選次數最少者優先；紀錄會保留到下次開啟，也可以清除。',
  roundsStored:'已保存輪數',roundsCurrent:'這份名單已安排 {count} 輪',roundsPal:'咕嘎安排了新搭檔！',roundsHistory:'這份名單已保存 {count} 輪；新一輪會參考這些紀錄。',roundsReady:'點擊下方按鈕產生換桌路線',roundsReadyShort:'尚未產生路線',roundsProgress:'已揭曉 {shown} / {total} 輪',rotationRound:'第 {index} 輪',rotationTable:'第 {index} 桌 · {count} 人',needRotationPeople:'請至少加入兩位成員才能換桌交流。',roundsReset:'換桌紀錄已清除',roundsFile:'換桌交流',rotationTableColumn:'桌次',
  turnRecorded:'已記錄輪值',turnPeople:'{count} 位對象可輪值',turnPal:'這次輪到 {name}！',turnContextPal:'咕嘎陪大家公平輪值！',turnReady:'準備輪到誰？',turnReadyHint:'按下按鈕，公平選出下一位。',turnLast:'剛選出第 {count} 次輪值。',turnFirstHint:'每位對象一開始都是 0 次。',turnSummary:'已輪值 {count} 次 · 各人被選 {min}–{max} 次',turnSummaryOne:'已輪值 1 次 · 各人被選 {min}–{max} 次',turnTimes:'{count} 次',turnOnce:'1 次',needTurnTargets:'請至少加入一位成員或一組。',turnReset:'輪值紀錄已清除',turnFile:'公平輪值',turnCountColumn:'累計被選次數'
});
Object.assign(staticEnglish,{
  '14 種玩法':'14 activities','座位冒險':'Seat Shuffle','單淘汰擂台賽':'Bracket Builder','座位圖':'Seat map','每列顯示':'Seats per row','3 個座位':'3 seats','4 個座位':'4 seats','5 個座位':'5 seats','6 個座位':'6 seats','編輯座位圖':'Edit seat map',
  '設定座位圖與間距規則，再點選停用座位；細節可點上方 i 查看。':'Set up the seat map and spacing rule, then tap seats to block them. Open the i button above for details.',
  '直行數（左右）':'Columns (left to right)','橫列數（前後）':'Rows (front to back)','建立新座位圖':'Create seat map','匯入或編輯座位表':'Import or edit seat map','講台 · 前方':'Stage · Front',
  '座位間距':'Seat spacing','不限制':'No spacing','左右留空':'Keep left/right empty','前後留空':'Keep front/back empty','四鄰位留空':'Keep 4 neighbors empty','八鄰位留空':'Keep 8 neighbors empty',
  '把個人名單隨機安排到可用座位；點選座位可暫時停用或恢復，匯入座位表的狀態欄也會生效。':'Randomly assign people to available seats. Tap seats to block or reopen them; an imported status field also applies.',
  '點選座位可切換可用狀態；至少要有一個可用座位。':'Tap a seat to change its availability. At least one seat must be open.','隨機安排座位 →':'Shuffle seats →','重設座位狀態':'Reset seat availability',
  '把個人或小組排進完整的單淘汰賽樹；輪空自動晉級，每場勝者立即出現在下一輪。':'Place people or teams in a complete single elimination bracket. Byes advance automatically, and each winner appears in the next round immediately.',
  '參賽對象':'Entrants','先產生對戰表，再點選每場勝者。':'Generate a bracket, then select the winner of each match.','點擊下方按鈕產生對戰表':'Generate a bracket below','產生對戰表 →':'Generate bracket →','清除對戰表':'Clear bracket',
  '跳過停用座位，隨機安排入座。':'Skip blocked seats and randomly assign places.','開啟座位冒險 →':'Open Seat Shuffle →','產生單淘汰對戰表，逐輪選出勝者。':'Create a single elimination bracket and choose winners round by round.','開啟單淘汰擂台賽 →':'Open Bracket Builder →'
});
Object.assign(staticEnglish,{'整列交錯留空':'Keep alternating rows empty','整行交錯留空':'Keep alternating columns empty','匯出格式':'Export format','逐筆 CSV':'List CSV','格狀 CSV':'Grid CSV','座位圖 PNG':'Seat map PNG','匯出座位表':'Export seat map'});
Object.assign(dynamicEnglish,{
  spaceCategory:'Spaces & contests',seatActivity:'Seat Shuffle',bracketActivity:'Bracket Builder',seatActivityHint:'Shuffle available seats',bracketActivityHint:'Build a single elimination bracket',seatTitle:'Find a new place',bracketTitle:'Watch the bracket take shape',
  seatHelp:'Set rows (front to back) and columns (left to right) to create a seat map, with the stage at the front. Choose a spacing rule: left/right, front/back, 4 neighbors (up/down/left/right), 8 neighbors (including diagonals), or alternate whole rows or columns. Tap seats to block or reopen them, then shuffle. Imported seat maps remain available. If the rule leaves too few seats, unseated people appear below. Export a list CSV, grid CSV, or PNG seat map.',
  bracketHelp:'Choose people or teams to generate the full single elimination bracket at once. Byes advance automatically. Tap a winner to fill the next round immediately; changing an earlier winner clears dependent results. Scroll the bracket to follow the connectors. You can clear or export it.',
  demoSeats:'Sample Seat Map',seatNameColumn:'Seat',seatStatusColumn:'Status',seats:'{count} seats',seatRosterSummary:'{members} seats · {columns} fields · Showing {fields}',seatAvailableCount:'Open seats',seatPlan:'{people} people · {seats} seats',bracketRoundsCount:'Rounds',bracketParticipants:'{count} entrants',newSeatRoster:'New seat map',seatRowsLabel:'Seats',seatRowsHelp:'One seat per line, or paste a table with headers such as Seat and Status',seatRowsPlaceholder:'For example:\nA1\nA2\nA3',seatEditorCount:'{rows} seats · {columns} fields',
  seatToggle:'{seat}: {status}. Tap to change.',seatOpen:'Available',seatClosed:'Blocked',seatReserved:'Spacing gap',seatUnseated:'{count} people without seats',seatEveryone:'Everyone has a seat',seatHint:'{open} open seats for {people} people. Tap seats to change availability.',seatSpacingResult:'This draw seated {assigned}; the spacing rule allows {capacity} seats.',seatRuleHintnone:'No spacing restriction.',seatRuleHinthorizontal:'Keep the seats immediately left and right of each person empty.',seatRuleHintvertical:'Keep the seats immediately in front of and behind each person empty.',seatRuleHintfour:'Keep the four adjacent seats in front, behind, left, and right empty.',seatRuleHinteight:'Keep all eight surrounding seats, including diagonals, empty.',seatNeed:'Add people and at least one available seat.',seatPal:'Guga has shuffled the seats!',seatReset:'Seat availability reset.',seatFile:'seat-shuffle',seatColumn:'Seat',personColumn:'Person',seatFront:'Stage · Front',seatGridInvalid:'Enter 1–16 whole-number rows and columns.',generatedSeatMap:'Seat map {rows} rows × {columns} columns',seatGridCreated:'Created {count} seats. Tap any seat to block it.',
  bracketReady:'Generate a bracket below',bracketFirstHint:'Generate a bracket, then select the winner of each match.',bracketMatch:'Match {index}',bracketBye:'Bye',bracketChampion:'Champion: {name}',bracketChampionWaiting:'Champion TBD',bracketWaiting:'Awaiting winner',bracketProgress:'{completed} / {total} matches decided · {rounds} rounds planned',bracketNeed:'Add at least two entrants.',bracketPal:'Guga built the bracket!',bracketReset:'Bracket cleared.',bracketFile:'bracket',bracketMatchColumn:'Match',bracketSideColumn:'Side',bracketWonColumn:'Advanced'
});
Object.assign(dynamicChinese,{
  spaceCategory:'空間與競賽',seatActivity:'座位冒險',bracketActivity:'單淘汰擂台賽',seatActivityHint:'跳過停用座位，隨機入座',bracketActivityHint:'勝者即時晉級，連線通向冠軍',seatTitle:'換個座位，換個驚喜',bracketTitle:'一路晉級，直到最後的冠軍',
  seatHelp:'設定橫列數（前後）與直行數（左右），即可快速建立座位圖；講台在最前方。可選左右、前後、四鄰位、八鄰位或整列／整行交錯留空，再點座位停用或恢復並隨機安排。仍可匯入座位表；符合間距的座位不足時，未入座者會列在下方。可匯出逐筆 CSV、格狀 CSV 或 PNG 座位圖。',
  bracketHelp:'選個人或小組，一次畫出完整的單淘汰賽樹與連線。輪空者自動晉級；每場點選勝者後，下一輪立即顯示該隊。若改選前一場，受影響的後續結果會清除。可捲動查看、清除或匯出。',
  demoSeats:'示範座位圖',seatNameColumn:'座位',seatStatusColumn:'狀態',seats:'{count} 個座位',seatRosterSummary:'{members} 個座位 · {columns} 欄 · 顯示 {fields}',seatAvailableCount:'可用座位',seatPlan:'{people} 位成員 · {seats} 個座位',bracketRoundsCount:'輪次',bracketParticipants:'{count} 位參賽者',newSeatRoster:'新座位圖',seatRowsLabel:'座位清單',seatRowsHelp:'單欄每行一個座位；也可貼上含「座位」「狀態」等標題的表格',seatRowsPlaceholder:'例如：\nA1\nA2\nA3',seatEditorCount:'{rows} 個座位 · {columns} 欄',
  seatToggle:'{seat}：{status}，點擊切換',seatOpen:'可用',seatClosed:'停用',seatReserved:'間距留空',seatUnseated:'{count} 位尚未入座',seatEveryone:'全員都已入座',seatHint:'{open} 個可用座位，{people} 位成員；點選座位可切換狀態。',seatSpacingResult:'本次安排 {assigned} 位；間距規則可安排 {capacity} 個座位。',seatRuleHintnone:'不限制相鄰座位。',seatRuleHinthorizontal:'每人左右緊鄰座位需留空。',seatRuleHintvertical:'每人正前方與正後方座位需留空。',seatRuleHintfour:'每人前、後、左、右四個相鄰座位需留空。',seatRuleHinteight:'每人周圍八個座位（含斜對角）需留空。',seatNeed:'請加入成員和至少一個可用座位。',seatPal:'咕嘎安排好了新座位！',seatReset:'座位狀態已重設',seatFile:'座位冒險',seatColumn:'座位',personColumn:'成員',seatFront:'講台 · 前方',seatGridInvalid:'行數與列數請輸入 1–16 的整數。',generatedSeatMap:'座位圖 {rows} 列 × {columns} 行',seatGridCreated:'已建立 {count} 個座位，點選座位即可停用。',
  bracketReady:'點擊下方按鈕產生對戰表',bracketFirstHint:'先產生完整對戰樹，再逐場點選勝者。',bracketMatch:'第 {index} 場',bracketBye:'輪空',bracketChampion:'冠軍：{name}',bracketChampionWaiting:'冠軍待揭曉',bracketWaiting:'等待勝者',bracketProgress:'已決出 {completed} / {total} 場 · 共 {rounds} 輪',bracketNeed:'請至少加入兩位參賽者。',bracketPal:'咕嘎排好了對戰表！',bracketReset:'對戰表已清除',bracketFile:'單淘汰擂台賽',bracketMatchColumn:'場次',bracketSideColumn:'序位',bracketWonColumn:'晉級'
});
Object.assign(dynamicEnglish,{
  seatRuleHintrowGap:'Leave the entire row in front of and behind each occupied row empty.',seatRuleHintcolumnGap:'Leave the entire column to the left and right of each occupied column empty.',
  seatMapTitle:'Seat map',seatSpacingLabel:'Spacing',seatExportSummary:'Assigned: {assigned} · Without seats: {unseated}',seatExportBlank:'No assignments yet',seatPngError:'Could not create the PNG seat map.'
});
Object.assign(dynamicChinese,{
  seatRuleHintrowGap:'每個已入座橫列的前後整列都留空。',seatRuleHintcolumnGap:'每個已入座直行的左右整行都留空。',
  seatMapTitle:'座位圖',seatSpacingLabel:'間距',seatExportSummary:'已入座：{assigned} 位 · 未入座：{unseated} 位',seatExportBlank:'尚未安排座位',seatPngError:'無法產生 PNG 座位圖。'
});
Object.assign(staticEnglish,{
  'RandoPal 版本 V0.63':'RandoPal version V0.63','RandoPal 版本 V0.64':'RandoPal version V0.64','RandoPal 版本 V0.65':'RandoPal version V0.65','RandoPal 版本 V0.66':'RandoPal version V0.66','RandoPal 版本 V0.67':'RandoPal version V0.67','15 種玩法':'15 activities','資源名單':'Resource rosters',
  '兩邊名單等量、一對一配對。可手動或隨機加橫線；鎖定格子後，從上往下或從下往上追蹤。':'Match two equal rosters one to one. Add rungs manually or randomly, lock the ladder, then trace from top or bottom.',
  '需求方':'Participants','＋ 新增資源':'＋ Add resources','編輯資源':'Edit resources','選擇等量的需求方與資源，按「建立格子」開始。':'Choose equal numbers of participants and resources, then create the ladder.',
  '建立格子':'Create ladder','＋ 隨機加一條':'＋ Add one random rung','＋ 隨機加五條':'＋ Add five random rungs','↶ 撤銷上一條':'↶ Undo last rung',
  '先建立格子，再點選相鄰直線之間畫橫線。':'Create the ladder, then tap between neighboring lines to add rungs.','鎖定格子，開始揭曉 →':'Lock ladder and reveal →','揭曉全部':'Reveal all','重新開始':'Start over',
  '爬格子':'Ladder Match','一起畫橫線，鎖定格子後逐條揭曉。':'Draw rungs together, lock the ladder, then reveal each path.','開啟爬格子 →':'Open Ladder Match →'
});
Object.assign(dynamicEnglish,{
  ladderActivity:'Ladder Match',ladderActivityHint:'Draw paths for one-to-one matches',ladderTitle:'Follow the ladder to a surprise',ladderHelp:'Choose equal sized participant and resource rosters (2–24 rows each). Create a ladder; tap between neighboring lines or add random rungs any time before locking. Lock the ladder without moving resources, then tap a participant above to trace downward or a resource below to trace upward. Random rungs guarantee one-to-one matches but do not make every possible pairing equally likely. Each resource is assigned once. Import CSV or Excel lists and choose fields to show.',
  demoResources:'Sample Resources',resourceColumn:'Resource',resources:'{count} resources',resourceRosterSummary:'{members} resources · {columns} fields · Showing {fields}',newResourceRoster:'New resource roster',resourceRowsLabel:'Resources',resourceRowsHelp:'One resource per line, or paste a table with headers',resourceRowsPlaceholder:'For example:\nProject A\nProject B\nProject C',resourceEditorCount:'{rows} resources · {columns} fields',
  ladderRevealedCount:'Matches revealed',ladderContext:'{count} participants · {rungs} rungs',ladderContextOne:'{count} participants · 1 rung',ladderPal:'Guga is ready to draw rungs!',ladderLockedPal:'The ladder is locked. Pick a path!',ladderMismatch:'The two sides must have the same number: {targets} participants and {resources} resources.',ladderNeedTwo:'Add at least two participants and two resources.',ladderTooMany:'This ladder supports 2–{max} per side; currently {count}.',ladderStartHint:'Choose two equal rosters, then create the ladder.',ladderDrawHint:'{rungs} rungs drawn. Add more, then lock the ladder.',ladderDrawHintOne:'1 rung drawn. Add more, then lock the ladder.',ladderLockedHint:'{done} / {total} paths revealed. Tap a participant above or a resource below, or reveal all.',ladderAllDone:'All matches revealed. Select a path to review it, copy the results, or export a CSV.',ladderEmpty:'Create the ladder, then tap between neighboring lines to add rungs.',ladderTraceTitle:'Trace {name}',ladderTraceUp:'Trace upward from bottom position {index}',ladderBeforeLock:'Lock the ladder before tracing',ladderRemoveRung:'Remove rung between lanes {gap} and {next} at level {level}',ladderAddRung:'Add rung between lanes {gap} and {next} at level {level}',ladderCollision:'A neighboring rung already occupies this level.',ladderFull:'There is no space for another rung.',ladderFile:'ladder-match',ladderDemandColumn:'Participant',ladderResourceColumn:'Resource'
});
Object.assign(dynamicChinese,{
  ladderActivity:'爬格子',ladderActivityHint:'畫橫線，配出一對一結果',ladderTitle:'沿著格子走，遇見意想不到的結果',ladderHelp:'選兩份等量的需求方與資源名單（各 2–24 筆）。建立格子後，點相鄰直線之間手動畫橫線，或在鎖定前隨時隨機加線。鎖定後資源位置不再變動；可點上方需求方往下追，或點下方資源往上追，每個資源只會分配一次。隨機加線能產生一對一結果，但不保證每一種配對都等機率。可匯入 CSV／Excel 多欄名單，並選擇顯示欄位。',
  demoResources:'示範資源',resourceColumn:'資源',resources:'{count} 項資源',resourceRosterSummary:'{members} 項資源 · {columns} 欄 · 顯示 {fields}',newResourceRoster:'新資源名單',resourceRowsLabel:'資源清單',resourceRowsHelp:'單欄每行一項資源；也可貼上含標題列的表格',resourceRowsPlaceholder:'例如：\n題目 A\n題目 B\n題目 C',resourceEditorCount:'{rows} 項資源 · {columns} 欄',
  ladderRevealedCount:'已揭曉配對',ladderContext:'{count} 位需求方 · {rungs} 條橫線',ladderContextOne:'{count} 位需求方 · 1 條橫線',ladderPal:'咕嘎陪你一起畫橫線！',ladderLockedPal:'格子已鎖定，來選一條路！',ladderMismatch:'兩邊數量必須相同：需求方 {targets} 位、資源 {resources} 項。',ladderNeedTwo:'請至少加入兩位需求方和兩項資源。',ladderTooMany:'每邊支援 2–{max} 筆；目前有 {count} 筆。',ladderStartHint:'選兩份等量名單，再建立格子。',ladderDrawHint:'已畫 {rungs} 條橫線，可繼續加線，再鎖定格子。',ladderDrawHintOne:'已畫 1 條橫線，可繼續加線，再鎖定格子。',ladderLockedHint:'已揭曉 {done} / {total} 條路徑；點上方需求方、下方資源，或一次揭曉。',ladderAllDone:'全部配對已揭曉。可點路徑重新查看、複製結果或匯出 CSV。',ladderEmpty:'先建立格子，再點相鄰直線之間畫橫線。',ladderTraceTitle:'追蹤 {name}',ladderTraceUp:'從下方第 {index} 格往上追蹤',ladderBeforeLock:'請先鎖定格子',ladderRemoveRung:'移除第 {level} 層第 {gap} 與 {next} 條直線之間的橫線',ladderAddRung:'在第 {level} 層第 {gap} 與 {next} 條直線之間加橫線',ladderCollision:'同一高度的相鄰橫線會相碰，請換個位置。',ladderFull:'已沒有可加橫線的位置。',ladderFile:'爬格子',ladderDemandColumn:'需求方',ladderResourceColumn:'資源'
});
Object.assign(staticEnglish,{
  '記住進度':'Remember progress','記住遊戲進度':'Remember game progress','將遊戲進度保存在這台裝置的瀏覽器':'Save game progress in this browser on this device','↺ 清除本玩法':'↺ Clear this game','清除此玩法進度':'Clear progress for this game','收合右側進度':'Collapse progress panel','進度':'Progress'
});
Object.assign(dynamicEnglish,{
  rememberOn:'Remember progress',rememberOff:'Progress not saved',rememberHelp:'Keep game progress in this browser. Rosters stay on this device even when this is off.',progressCleared:'This game is ready for a fresh start.',collapseContext:'Collapse progress panel',expandContext:'Expand progress panel',progressMini:'Progress'
});
Object.assign(dynamicChinese,{
  rememberOn:'記住進度',rememberOff:'不記進度',rememberHelp:'將遊戲進度存在這台裝置的瀏覽器；關閉後，名單仍保留於本機。',progressCleared:'已清除此玩法進度，可以重新開始。',collapseContext:'收合右側進度',expandContext:'展開右側進度',progressMini:'進度'
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
