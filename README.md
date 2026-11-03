# RandoPal

**目前版本：V0.55**（Chrome 擴充功能版本 `0.55.0`）。

RandoPal 提供名單隨機抽選、排序與平均分組。抽選有跑馬燈、幸運轉盤和翻牌；排序與分組有逐步揭曉模式。可匯入 CSV、TXT、XLSX，保留每一列的多欄資料，並選擇結果顯示哪些欄位。介面支援繁體中文和英文，頂部用「繁中 / EN」切換。

## 兩種使用方式

- [公開網頁版](https://sywan.github.io/RandoPal/)：在電腦或手機的現代瀏覽器開啟。GitHub Pages 從 `main` 分支根目錄發布。
- [Chrome 擴充功能](release/v0.55/chrome/README.md)：從工具列開啟，也可用投影模式。執行 `npm run package` 產生 V0.55 ZIP。

兩者各自把名單與偏好保存在使用者目前的瀏覽器，不會自動跨裝置同步。CSV／XLSX 可用於轉移名單。隱私政策：[繁中 / English](https://randopal-privacy-policy.cguaacsb.chatgpt.site/)。

## 開發與發布

在專案資料夾執行 `npm start`，本機開啟 `http://localhost:4173/`。執行 `npm test` 檢查核心與翻譯；執行 `npm run package` 重建 Chrome ZIP；執行 `npm run build:guide` 更新 [發布指南](deployment-guide.html)。推送 `main` 分支後，GitHub Pages 會重新發布網頁版。

程式入口為 `index.html`；畫面在 `styles.css` 和 `src/app.js`，隨機與匯入邏輯在 `src/core.js`、`src/xlsx.js`，翻譯在 `src/i18n.js`。擴充功能使用 `manifest.json` 與 `_locales/`。詳細的翻譯維護方式見 [I18N.md](I18N.md)。

V0.55 的咕嘎動畫為 1000 × 925 像素、150 張影格、12 秒透明循環。側欄播放 `icons/guga-pal-hd.webp`，並提供 `icons/guga-pal-hd.gif` 下載。舊版 GIF 與 WebP 保存在 [backup/v0.50](backup/v0.50/README.md)。舞步姿勢來源在 `icons/guga-dance-poses/`；執行 `node scripts/build-guga-dance.mjs` 可重建，需要 ImageMagick 和 `gif2webp`。

Chrome 上架文案、商店圖片與隱私欄位說明在 [V0.55 Chrome release](release/v0.55/chrome/STORE-LISTING.md)。舊 Chrome 版保留在 `release/v0.50/chrome/`。
