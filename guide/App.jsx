import React,{useState} from 'react';
import{createRoot}from'react-dom/client';

const site='https://sywan.github.io/RandoPal/';
const privacy='https://randopal-privacy-policy.cguaacsb.chatgpt.site/';
const zip='release/v0.55/chrome/RandoPal-chrome-v0.55.zip';
const copy={
  zh:{title:'發布與安裝指南',sub:'RandoPal 網頁版 V0.56 · Chrome 擴充功能 V0.55',choose:'選擇主題',
    tabs:{start:'總覽',chrome:'Chrome 擴充功能',web:'GitHub 網頁版',update:'更新流程'},
    toggle:'EN',intro:'目前維護兩種使用方式。網頁版已更新咕嘎舞步；Chrome 擴充功能維持 V0.55。',
    chrome:'Chrome 擴充功能',chromeInfo:'在 Chrome 工具列開啟；可用 Chrome Web Store 發布。',
    web:'公開網頁版',webInfo:'用 Chrome、Safari、Edge 或其他現代瀏覽器開啟，支援電腦與手機。',
    note:'名單儲存在各自瀏覽器的本機空間，不會自動跨裝置同步。',
    download:'下載 Chrome V0.55 ZIP',open:'開啟公開網站',listing:'商店文案與素材',policy:'公開隱私政策',
    chromeSteps:['使用已封存的 Chrome V0.55 ZIP；本次網頁舞步更新不需要重新打包。','到 chrome://extensions 開啟開發人員模式，選「載入未封裝項目」，指向 release/v0.55/chrome/extension。','測試功能後，在 Chrome Web Store 開發人員後台上傳 V0.55 ZIP，使用商店文案與隱私政策資料完成送審。'],
    webSteps:['修改專案根目錄的 index.html、styles.css、src/ 和 icons/。','執行 npm test，再將變更提交並推送到 GitHub main 分支。','GitHub Pages 會從 main 的根目錄重新發布；到公開網址檢查畫面與互動。'],
    updateSteps:['網頁版與 Chrome 版號分開維護；目前分別為 V0.56 與 V0.55。','網頁版推送到 main 後自動發布。未來正式更新 Chrome 時，再同步 manifest、打包腳本並建立新版 ZIP。','Chrome V0.55 ZIP 與商店素材保留在 release/v0.55/chrome；舊版咕嘎動畫保留在 backup/v0.50。'],
    footer:'這份指南是可離線開啟的單一 HTML；公開網站與官方文件連結需要網路。'},
  en:{title:'Deployment guide',sub:'RandoPal web V0.56 · Chrome extension V0.55',choose:'Choose a topic',
    tabs:{start:'Overview',chrome:'Chrome extension',web:'GitHub web app',update:'Update workflow'},
    toggle:'繁中',intro:'Two ways to use RandoPal are maintained. The web app has the updated Guga dance; the Chrome extension remains V0.55.',
    chrome:'Chrome extension',chromeInfo:'Launch from the Chrome toolbar and publish through the Chrome Web Store.',
    web:'Public web app',webInfo:'Open in Chrome, Safari, Edge, or another modern browser on desktop or mobile.',
    note:'Rosters are stored locally in each browser and do not sync automatically across devices.',
    download:'Download Chrome V0.55 ZIP',open:'Open public site',listing:'Store copy and assets',policy:'Public privacy policy',
    chromeSteps:['Use the archived Chrome V0.55 ZIP; this web-only dance update does not require repackaging.','Open chrome://extensions, enable Developer mode, choose Load unpacked, and select release/v0.55/chrome/extension.','After testing, upload the V0.55 ZIP in the Chrome Web Store Developer Dashboard and complete the listing and privacy fields.'],
    webSteps:['Edit index.html, styles.css, src/, and icons/ in the project root.','Run npm test, then commit and push the changes to the GitHub main branch.','GitHub Pages republishes from the root of main. Check the public URL for the UI and interactions.'],
    updateSteps:['Maintain separate web and Chrome versions; they are currently V0.56 and V0.55.','Pushing to main updates the web app. When a future Chrome release is planned, align the manifest and packaging script and build a new ZIP.','The Chrome V0.55 ZIP and store assets remain under release/v0.55/chrome; earlier Guga animations remain under backup/v0.50.'],
    footer:'This guide is one offline HTML file. The live website and official documentation links require internet access.'}
};
function App(){
  const[lang,setLang]=useState(()=>{try{return localStorage.getItem('randopal-guide-lang')||'zh'}catch{return'zh'}});
  const[tab,setTab]=useState(()=>['start','chrome','web','update'].includes(location.hash.slice(1))?location.hash.slice(1):'start');
  const s=copy[lang];
  const switchLang=()=>{const next=lang==='zh'?'en':'zh';setLang(next);document.documentElement.lang=next==='zh'?'zh-Hant':'en';try{localStorage.setItem('randopal-guide-lang',next)}catch{}};
  return <div className="shell">
    <header className="hero"><img src="icons/guga-pal-hd.png" alt="Guga"/><div><span className="tag">RandoPal Web V0.56</span><h1>{s.title}</h1><p>{s.sub}</p></div></header>
    <div className="top"><h2>{s.choose}</h2><button className="lang" type="button" onClick={switchLang}>{s.toggle}</button></div>
    <nav className="tabs" role="tablist" aria-label={s.choose}>{Object.entries(s.tabs).map(([key,label])=><button key={key} type="button" role="tab" aria-selected={key===tab} onClick={()=>{setTab(key);location.hash=key}}>{label}</button>)}</nav>
    <main className="panel" role="tabpanel">
      {tab==='start'&&<><h2>{s.title}</h2><p>{s.intro}</p><div className="grid"><div className="card"><strong>{s.chrome}</strong><p>{s.chromeInfo}</p></div><div className="card"><strong>{s.web}</strong><p>{s.webInfo}</p></div></div><div className="callout">{s.note}</div><a className="button" href={zip} download>{s.download}</a><a className="button secondary" href={site} target="_blank" rel="noopener">{s.open}</a></>}
      {tab==='chrome'&&<><h2>{s.chrome}</h2><p>{s.chromeInfo}</p><a className="button" href={zip} download>{s.download}</a><a className="button secondary" href="release/v0.55/chrome/STORE-LISTING.md">{s.listing}</a><a className="button secondary" href={privacy} target="_blank" rel="noopener">{s.policy}</a><ol className="steps">{s.chromeSteps.map((step,i)=><li key={i}>{step}</li>)}</ol></>}
      {tab==='web'&&<><h2>{s.web}</h2><p>{s.webInfo}</p><a className="button" href={site} target="_blank" rel="noopener">{s.open}</a><ol className="steps">{s.webSteps.map((step,i)=><li key={i}>{step}</li>)}</ol><div className="callout">{s.note}</div></>}
      {tab==='update'&&<><h2>{s.tabs.update}</h2><ol className="steps">{s.updateSteps.map((step,i)=><li key={i}>{step}</li>)}</ol></>}
    </main><footer className="foot">{s.footer}</footer>
  </div>;
}
createRoot(document.getElementById('app')).render(<App/>);
