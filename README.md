# RandoPal

**公開網頁版：V0.56**。Chrome 擴充功能維持 **V0.55**（manifest 版本 `0.55.0`）。

RandoPal 提供名單隨機抽選、排序與平均分組。抽選有跑馬燈、幸運轉盤和翻牌；排序與分組有逐步揭曉模式。可匯入 CSV、TXT、XLSX，保留每一列的多欄資料，並選擇結果顯示哪些欄位。介面支援繁體中文和英文，頂部用「繁中 / EN」切換。

## 兩種使用方式

- [公開網頁版](https://sywan.github.io/RandoPal/)：在電腦或手機的現代瀏覽器開啟。GitHub Pages 使用 `.github/workflows/pages.yml`，從 `main` 分支挑選網頁所需檔案發布。
- [Chrome 擴充功能](release/v0.55/chrome/README.md)：從工具列開啟，也可用投影模式。V0.55 ZIP 已封存，本次網頁版更新不重新打包。

兩者各自把名單與偏好保存在使用者目前的瀏覽器，不會自動跨裝置同步。CSV／XLSX 可用於轉移名單。隱私政策：[繁中 / English](https://randopal-privacy-policy.cguaacsb.chatgpt.site/)。

## 開發與發布

在專案資料夾執行 `npm start`，本機開啟 `http://localhost:4173/`。執行 `npm test` 檢查核心與翻譯；執行 `npm run build:guide` 更新 [發布指南](deployment-guide.html)。推送 `main` 分支後，GitHub Pages 會重新發布網頁版。網頁與 Chrome 的版號現在分開維護；`npm run package` 會在版號不同時停止，避免不小心覆寫已封存的 Chrome V0.55 套件。未來正式更新擴充功能時，再同步 manifest 與打包設定。

程式入口為 `index.html`；畫面在 `styles.css` 和 `src/app.js`，隨機與匯入邏輯在 `src/core.js`、`src/xlsx.js`，翻譯在 `src/i18n.js`。擴充功能使用 `manifest.json` 與 `_locales/`。詳細的翻譯維護方式見 [I18N.md](I18N.md)。

網頁版 V0.56 使用使用者選定的咕嘎舞步：1000 × 925 像素、150 張影格、約 12 秒透明循環。側欄與右側資訊卡播放其轉製的 `icons/guga-pal-web-v056.webp`，並提供與使用者提供檔案位元相同的 `icons/guga-pal-web-v056.gif` 下載。Chrome V0.55 套件維持原樣；更早版本保存在 [backup/v0.50](backup/v0.50/README.md)。之前的 Fast 舞步候選素材保存在本機 `preview/guga-moonwalk/`。

Chrome 上架文案、商店圖片與隱私欄位說明在 [V0.55 Chrome release](release/v0.55/chrome/STORE-LISTING.md)。舊 Chrome 版保留在 `release/v0.50/chrome/`。
