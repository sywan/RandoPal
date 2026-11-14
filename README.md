# RandoPal

**公開網頁版：V0.59**。Chrome 擴充功能維持 **V0.55**（manifest 版本 `0.55.0`）。

RandoPal 提供依情境分類的隨機玩法：抽選、排序、分組、小組配對、任務盲盒、角色輪盤與互評巡迴。抽選有跑馬燈、幸運轉盤和翻牌；排序與分組有逐步揭曉模式。可匯入 CSV、TXT、XLSX，保留每一列的多欄資料，並選擇結果顯示哪些欄位。介面支援繁體中文和英文，頂部用「繁中 / EN」切換。

## 兩種使用方式

- [公開網頁版](https://sywan.github.io/RandoPal/)：在電腦或手機的現代瀏覽器開啟。GitHub Pages 使用 `.github/workflows/pages.yml`，從 `main` 分支挑選網頁所需檔案發布。
- [Chrome 擴充功能](release/v0.55/chrome/README.md)：從工具列開啟，也可用投影模式。V0.55 ZIP 已封存，本次網頁版更新不重新打包。

兩者各自把名單與偏好保存在使用者目前的瀏覽器，不會自動跨裝置同步。CSV／XLSX 可用於轉移名單。隱私政策：[繁中 / English](https://randopal-privacy-policy.cguaacsb.chatgpt.site/)。

## 開發與發布

在專案資料夾執行 `npm start`，本機開啟 `http://localhost:4173/`。執行 `npm test` 檢查核心與翻譯；執行 `npm run build:guide` 更新 [發布指南](deployment-guide.html)。推送 `main` 分支後，GitHub Pages 會重新發布網頁版。網頁與 Chrome 的版號現在分開維護；`npm run package` 會在版號不同時停止，避免不小心覆寫已封存的 Chrome V0.55 套件。未來正式更新擴充功能時，再同步 manifest 與打包設定。

程式入口為 `index.html`；畫面在 `styles.css` 和 `src/app.js`，隨機與匯入邏輯在 `src/core.js`、`src/xlsx.js`，翻譯在 `src/i18n.js`。擴充功能使用 `manifest.json` 與 `_locales/`。詳細的翻譯維護方式見 [I18N.md](I18N.md)。

V0.57 新增「小組配對」：小組名單與個人名單分開保存，支援指定每對幾組或總配對數、配對總覽與逐對揭曉，以及 CSV／Excel 匯入。每列代表一個現有小組；配對時保留整列資料，結果可選擇顯示欄位，CSV 匯出保留所有欄位。當小組數不能整除時，配對數會調整以避免單獨一組。Chrome V0.55 套件維持原樣。

V0.58 新增分類導覽與三種玩法：任務盲盒可從任務卡庫抽卡並避免重複；角色輪盤把角色卡分給人或小組，重抽時盡量避開上一輪相同配置；互評巡迴產生不評自己、不重複受評對象的多輪路線。任務卡與角色卡可在名單工作室匯入 CSV／Excel，選擇顯示欄位；三種結果支援複製與 CSV 匯出。後續玩法見 [ROADMAP.md](ROADMAP.md)。

V0.59 加入「卡片創意」分類：創意混搭可選兩副卡庫並避免本輪重複組合；驚喜事件卡從指定卡庫抽出不重複的突發條件；話題賓果可產生 3×3、4×4 或 5×5 卡，逐格標記、列印或匯出 CSV。附上四副示範卡庫，所有玩法也可使用自行匯入的多欄 CSV／Excel 卡庫。網頁版已更新，Chrome V0.55 封存版本維持原樣。

咕嘎動畫自 V0.56 起使用選定舞步：1000 × 925 像素、150 張影格、約 12 秒透明循環。側欄與右側資訊卡播放 `icons/guga-pal-web-v056.webp`，並提供與使用者提供檔案位元相同的 `icons/guga-pal-web-v056.gif` 下載。更早版本保存在 [backup/v0.50](backup/v0.50/README.md)。之前的 Fast 舞步候選素材保存在本機 `preview/guga-moonwalk/`。

Chrome 上架文案、商店圖片與隱私欄位說明在 [V0.55 Chrome release](release/v0.55/chrome/STORE-LISTING.md)。舊 Chrome 版保留在 `release/v0.50/chrome/`。
