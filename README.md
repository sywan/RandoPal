# RandoPal

**目前版本：V0.50**（套件與 Chrome 擴充功能版本為 `0.50.0`）。

一個可在瀏覽器本機執行、也能直接以 Manifest V3 擴充功能載入的隨機工具。目前提供多名單、隨機抽選、排序、平均分組、複製結果、投影分頁、動畫和可切換的音效。抽選可用跑馬燈、轉盤或翻牌；排序可看完整清單或逐位揭曉；分組可看總覽或逐組揭曉。切換呈現方式不會重新產生結果。抽選投影模式保留總數、剩餘數與已抽名單。

App 頂部可切換繁體中文與英文。語言偏好保存在本機；開啟投影分頁時會沿用選擇，並可在其他已開啟的同來源分頁同步。界面翻譯集中在 `src/i18n.js`，擴充套件商店名稱與簡介在 `_locales/zh_TW`、`_locales/en`。匯入名單的個人資料與自訂欄位名稱不會被翻譯或更動。

後續新增語言與文案的維護方式見 [I18N.md](I18N.md)。

## 本機預覽

在專案資料夾執行 `npm start`，再開啟 [http://localhost:4173](http://localhost:4173)。沒有套件安裝或雲端服務需求。執行 `npm test` 可檢查隨機與匯入核心邏輯。

## 公開網站（GitHub Pages）

網站網址：[https://sywan.github.io/RandoPal/](https://sywan.github.io/RandoPal/)。網站從 `main` 分支的根目錄發布；更新網頁後，將變更提交並推送到 `main`，GitHub Pages 就會重新部署。`index.html` 使用相對路徑，因此也可在專案網址下載入樣式、程式和圖片。`.nojekyll` 讓 `_locales` 等以底線開頭的資料夾仍可被原樣發布。

公開網站與 Chrome／Edge 擴充功能、iPhone／iPad 網頁版各自有獨立的瀏覽器本機儲存空間。名單不會因為推送原始碼而上傳到 GitHub，也不會自動跨裝置同步；換裝置時可重新匯入 CSV／XLSX。

## 咕嘎高解析度素材

側欄播放 `icons/guga-pal-hd.webp`，抽出結果時播放 `icons/guga-spin-hd.webp`。兩者皆為 1000 × 925 像素的透明動畫。可從側欄下載相同尺寸、方便離線觀看的 `icons/guga-pal-hd.gif`，或下載靜態 `icons/guga-pal-hd.png`。使用 `sh scripts/build-guga-hd.sh` 可從原始姿勢圖重新產生素材；需本機安裝 ImageMagick 與 `img2webp`。

## 品牌標誌

`icons/pal.svg` 是可編輯的藍色轉盤標誌；`icons/icon-16.png`、`icon-32.png`、`icon-48.png`、`icon-128.png` 是擴充套件工具列與商店用圖示。商店另備有 512 像素版本、宣傳圖與截圖，見 [Chrome 上架文案與素材](release/v0.50/chrome/STORE-LISTING.md)。舊版圖示若仍顯示為黑色，在 `chrome://extensions` 對側載套件按「重新載入」。

## Chrome 擴充功能測試

開啟 `chrome://extensions`、啟用「開發人員模式」，選擇「載入未封裝項目」，指向本專案資料夾。工具列圖示開啟精簡 popup；「投影模式」開啟完整分頁，大分頁可按「返回一般模式」。一般網頁則可在同一分頁切換投影模式。桌面版可用左上角按鈕收合側欄，或拖曳側欄右邊界調整寬度；主要內容獨立捲動。程式碼和圖示都在本專案，僅請求 `storage` 權限。

本機網站使用 `localStorage`，擴充功能使用 `chrome.storage.local`。兩者是不同來源，測試網站的資料不會自動出現在擴充功能中；可透過名單檔案重新匯入。

## 匯入名單

在「編輯名單」中選擇 CSV、TXT 或 XLSX。CSV 與 XLSX 會保留每列的所有欄位；可勾選或取消「第一列是欄位標題」，預覽會立即更新。沒有表頭時會產生「欄位 1」等暫用欄名，第一列資料仍會保留。XLSX 取第一張工作表。TXT 可用換行、逗號、頓號或分號分隔。匯入結果先顯示在編輯框內，可以選擇結果要顯示哪些欄位，預設只顯示「姓名」欄（若沒有則顯示第一欄）。排序與分組始終以完整資料列為單位，並可匯出包含全部欄位的 CSV。匯出時會處理試算表公式開頭字元，以避免開啟 CSV 時意外執行公式。目前不支援舊版 `.xls` 格式。

## 架構

- `src/core.js`：隨機、排序、分組和名單解析。使用 Web Crypto 取得隨機值。
- `src/storage.js`：在 web 與擴充功能之間切換儲存實作。
- `src/xlsx.js`：在瀏覽器內解析 XLSX，沒有遠端函式庫或檔案上傳。
- `src/app.js`：畫面狀態、動畫和由 Web Audio API 產生的音效。
- `src/i18n.js`：繁體中文與英文翻譯，以及語言切換。

## 各平台套件與發布指南

直接開啟 [多分頁發布指南](deployment-guide.html)，可切換繁體中文／英文，查看 Chrome、Edge、Safari、iPhone／iPad 的安裝、編輯、測試與上架步驟。指南由 React 建置成單一 HTML，開啟時不需網路或開發伺服器。要修改指南，編輯 `guide/App.jsx` 或 `guide/template.html`，執行 `npm --prefix guide install` 和 `npm run build:guide`。

各平台 ZIP 與 Xcode 原始碼在 [release/v0.50](release/v0.50/README.md)。執行 `npm run package:all` 可在 Mac 上重建 Chrome、Edge、iOS 與 Safari 套件，並將 Safari Xcode 專案版本同步成 V0.50；單獨重建 Safari 可執行 `npm run package:safari`。商店截圖與 Chrome 隱私說明草稿也已備妥。實際上架仍需用各商店帳號提交，Apple 裝置安裝需使用自己的 Team 簽署，並在目標裝置測試。
