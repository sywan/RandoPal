import React,{useState} from 'react';
import{createRoot}from'react-dom/client';

const site='https://sywan.github.io/RandoPal/';
const privacy='https://sywan.github.io/RandoPal/privacy-policy.html';
const zip='release/v0.64/chrome/RandoPal-chrome-v0.64.zip';
const copy={
  zh:{title:'發布與安裝指南',sub:'RandoPal 網頁版 V0.64 · Chrome 擴充功能 V0.64',choose:'選擇主題',
    tabs:{start:'總覽',chrome:'Chrome 擴充功能',web:'GitHub 網頁版',update:'更新流程'},
    toggle:'EN',intro:'目前維護網頁版與 Chrome 擴充功能，兩者皆提供 V0.64 的六類、15 種玩法。擴充功能套件已備妥，需上傳到既有商店項目並送審。',
    chrome:'Chrome 擴充功能',chromeInfo:'在 Chrome 工具列開啟；可用 Chrome Web Store 發布。',
    web:'公開網頁版',webInfo:'用 Chrome、Safari、Edge 或其他現代瀏覽器開啟，支援電腦與手機。',
    note:'名單儲存在各自瀏覽器的本機空間，不會自動跨裝置同步。',
    download:'下載 Chrome V0.64 ZIP',open:'開啟公開網站',listing:'商店文案與素材',policy:'公開隱私政策',
    chromeSteps:['先到 chrome://extensions 啟用開發人員模式，用「載入未封裝項目」測試 release/v0.64/chrome/extension。','在 Chrome Web Store 開發人員後台開啟既有 RandoPal 項目，於 Package 上傳 RandoPal-chrome-v0.64.zip。','檢查商店說明與隱私權實務，將政策網址設為本網站的 privacy-policy.html，然後提交審核；核准並發布後，商店安裝版會自動更新。'],
    webSteps:['修改專案根目錄的 index.html、styles.css、src/ 和 icons/。','執行 npm test，再將變更提交並推送到 GitHub main 分支。','GitHub Pages 使用 .github/workflows/pages.yml 挑選網頁檔案發布；到公開網址檢查畫面與互動。'],
    updateSteps:['網頁版與 Chrome 套件目前皆為 V0.64；擴充功能 manifest 為 0.64.0。','網頁版推送到 main 後自動發布；Chrome 需另在既有 Web Store 項目上傳 ZIP 並送審。','舊版 Chrome V0.55 ZIP 保留在 release/v0.55/chrome。'],
    footer:'這份指南是可離線開啟的單一 HTML；公開網站與官方文件連結需要網路。'},
  en:{title:'Deployment guide',sub:'RandoPal web V0.64 · Chrome extension V0.64',choose:'Choose a topic',
    tabs:{start:'Overview',chrome:'Chrome extension',web:'GitHub web app',update:'Update workflow'},
    toggle:'繁中',intro:'The web app and Chrome extension package both provide V0.64 with 15 activities in six categories. The extension ZIP is ready to upload to the existing Store item for review.',
    chrome:'Chrome extension',chromeInfo:'Launch from the Chrome toolbar and publish through the Chrome Web Store.',
    web:'Public web app',webInfo:'Open in Chrome, Safari, Edge, or another modern browser on desktop or mobile.',
    note:'Rosters are stored locally in each browser and do not sync automatically across devices.',
    download:'Download Chrome V0.64 ZIP',open:'Open public site',listing:'Store copy and assets',policy:'Public privacy policy',
    chromeSteps:['Enable Developer mode at chrome://extensions and test the unpacked release/v0.64/chrome/extension folder.','Open the existing RandoPal item in the Chrome Web Store Developer Dashboard and upload RandoPal-chrome-v0.64.zip on Package.','Review the Store listing and Privacy practices, set the policy URL to this site’s privacy-policy.html, then submit for review. Store-installed copies update automatically after approval and publication.'],
    webSteps:['Edit index.html, styles.css, src/, and icons/ in the project root.','Run npm test, then commit and push the changes to the GitHub main branch.','GitHub Pages publishes selected web files through .github/workflows/pages.yml. Check the public URL for the UI and interactions.'],
    updateSteps:['Web and Chrome packages are currently both V0.64; the extension manifest is 0.64.0.','Pushing main deploys the web app; Chrome requires a separate ZIP upload and review for the existing Store item.','The previous Chrome V0.55 ZIP remains in release/v0.55/chrome.'],
    footer:'This guide is one offline HTML file. The live website and official documentation links require internet access.'}
};
function App(){
  const[lang,setLang]=useState(()=>{try{return localStorage.getItem('randopal-guide-lang')||'zh'}catch{return'zh'}});
  const[tab,setTab]=useState(()=>['start','chrome','web','update'].includes(location.hash.slice(1))?location.hash.slice(1):'start');
  const s=copy[lang];
  const switchLang=()=>{const next=lang==='zh'?'en':'zh';setLang(next);document.documentElement.lang=next==='zh'?'zh-Hant':'en';try{localStorage.setItem('randopal-guide-lang',next)}catch{}};
  return <div className="shell">
    <header className="hero"><img src="icons/guga-pal-hd.png" alt="Guga"/><div><span className="tag">RandoPal Web V0.64</span><h1>{s.title}</h1><p>{s.sub}</p></div></header>
    <div className="top"><h2>{s.choose}</h2><button className="lang" type="button" onClick={switchLang}>{s.toggle}</button></div>
    <nav className="tabs" role="tablist" aria-label={s.choose}>{Object.entries(s.tabs).map(([key,label])=><button key={key} type="button" role="tab" aria-selected={key===tab} onClick={()=>{setTab(key);location.hash=key}}>{label}</button>)}</nav>
    <main className="panel" role="tabpanel">
      {tab==='start'&&<><h2>{s.title}</h2><p>{s.intro}</p><div className="grid"><div className="card"><strong>{s.chrome}</strong><p>{s.chromeInfo}</p></div><div className="card"><strong>{s.web}</strong><p>{s.webInfo}</p></div></div><div className="callout">{s.note}</div><a className="button" href={zip} download>{s.download}</a><a className="button secondary" href={site} target="_blank" rel="noopener">{s.open}</a></>}
      {tab==='chrome'&&<><h2>{s.chrome}</h2><p>{s.chromeInfo}</p><a className="button" href={zip} download>{s.download}</a><a className="button secondary" href="https://github.com/sywan/RandoPal/blob/main/release/v0.64/chrome/STORE-LISTING.md" target="_blank" rel="noopener">{s.listing}</a><a className="button secondary" href={privacy} target="_blank" rel="noopener">{s.policy}</a><ol className="steps">{s.chromeSteps.map((step,i)=><li key={i}>{step}</li>)}</ol></>}
      {tab==='web'&&<><h2>{s.web}</h2><p>{s.webInfo}</p><a className="button" href={site} target="_blank" rel="noopener">{s.open}</a><ol className="steps">{s.webSteps.map((step,i)=><li key={i}>{step}</li>)}</ol><div className="callout">{s.note}</div></>}
      {tab==='update'&&<><h2>{s.tabs.update}</h2><ol className="steps">{s.updateSteps.map((step,i)=><li key={i}>{step}</li>)}</ol></>}
    </main><footer className="foot">{s.footer}</footer>
  </div>;
}
createRoot(document.getElementById('app')).render(<App/>);
