# RandoPal · Chrome Web Store 上架文案與素材（V0.50）

在開發人員後台上傳 `RandoPal-chrome-v0.50.zip` 後，依下列欄位填寫。「中文（繁體）」與 English 可在商店資訊頁上方的語言選單分別編輯；ZIP 已包含 `_locales/zh_TW` 與 `_locales/en`。App 內也可手動切換語言。

## 商店欄位

| 欄位 | 建議填寫 |
| --- | --- |
| 名稱（繁體中文） | RandoPal - 隨機抽選、排序與分組 |
| Name (English) | RandoPal - Random Pick, Order & Groups |
| 主要分類 | **Tools／工具**。功能適用課堂、活動、會議等情境；若日後聚焦教學，也可考慮 Education。 |
| 主要語言 | 中文（繁體）／`zh_TW`；另加入 English／`en` 在地化商店資訊。 |
| 商店圖示 | `store-assets/store-icon-128.png`（128 × 128） |
| 中文截圖 | `store-assets/01-pick-progress-1280x800.png`、`store-assets/02-smart-groups-1280x800.png` |
| English screenshot | `store-assets/01-pick-progress-en-1280x800.png` |
| 小型宣傳圖（選填） | `store-assets/promo-small-440x280.png` |
| 大型宣傳圖（選填） | `store-assets/promo-marquee-1400x560.png` |

宣傳圖無法依語言分別上傳，因此採用中性的英文品牌字樣；截圖則可以依語言上傳。商店截圖使用示範名單，不含使用者的私人資料。

## 簡短說明／Summary

**繁體中文**（已寫入 ZIP 的 `_locales/zh_TW/messages.json`；若後台出現摘要欄也可貼上）：

> 匯入 CSV／Excel 名單，用轉盤、跑馬燈或翻牌隨機抽人，也能排出場順序與平均分組。

**English**（included in the ZIP at `_locales/en/messages.json`; paste only if the dashboard shows a summary field）：

> Import CSV or Excel rosters, pick names with a wheel or cards, shuffle presentation order, and make balanced groups.

## 詳細說明／Detailed description

**繁體中文**（可直接貼上）：

> RandoPal 是適合課堂、活動與會議的隨機抽選工具。要抽人、點名、決定報告順序或分組時，打開擴充套件就能開始。
>
> • 隨機抽選：用跑馬燈、幸運轉盤或翻牌揭曉結果，可選擇抽過即排除，並查看本輪進度與已抽名單。  
> • 隨機排序：打亂完整名單，可一次查看或逐位揭曉，適合安排報告、發言與出場順序。  
> • 智慧分組：指定組數或每組人數，產生盡量平均的隊伍，可逐組揭曉。  
> • 名單管理：貼上名單，或匯入 CSV、TXT、Excel `.xlsx`；可指定第一列是否為表頭，保留多欄資料，並選擇結果顯示的欄位。  
> • 現場呈現：投影模式放大舞台；抽選時仍可看到總人數、剩餘人數和已抽名單。支援動畫、可開關音效與結果匯出。
>
> 名單與偏好儲存在本機瀏覽器，不需註冊帳號。

**English**（ready to paste）：

> RandoPal is a random name picker for classrooms, events, and meetings. Open the extension whenever you need to choose a person, set a presentation order, or split a group into teams.
>
> • Random pick: reveal a name with a slot machine, lucky wheel, or flip cards. Optionally exclude previous picks and track the current round.  
> • Random order: shuffle a whole roster, then view the list or reveal speakers one at a time.  
> • Smart groups: choose the number of groups or people per group to create teams with sizes as even as possible.  
> • Roster studio: paste a list or import CSV, TXT, or Excel `.xlsx` files. Choose whether the first row is a header, keep multiple fields per person, and select which fields appear in results.  
> • Presentation mode: enlarge the activity for a shared screen while keeping pick counts and previous picks visible. Animations, optional sound, and result exports are included.
>
> Rosters and preferences stay in this browser's local storage. No account is required.

上述文案自然包含「隨機抽選／抽人／點名／排序／分組」以及 “random name picker / lucky wheel / shuffle / groups” 等搜尋用語。商店政策不建議另外塞入大量重複或無關關鍵字。

## 隱私與權限欄位草稿

**單一用途／Single purpose**：提供本機名單的隨機抽選、排序、分組與結果呈現。 / Randomly pick, order, and group locally stored rosters, then present the results.

**`storage` 權限用途**：保存使用者匯入或建立的名單、顯示欄位設定及介面偏好，讓再次開啟擴充套件時可沿用。 / Stores user-created rosters, chosen display fields, and interface preferences locally between sessions.

**資料處理**：目前版本沒有 RandoPal 伺服器、帳號、分析或廣告；使用者選取的 CSV／Excel 檔在裝置上解析。請於上架前核對 `PRIVACY.md`，並依後台實際問題如實填寫。


## 「隱私權實務」頁逐欄填寫

- **Single purpose description**：目前畫面中的中英文句子可保留，清楚涵蓋抽選、排序、分組與呈現。
- **storage justification**：目前畫面中的句子可保留；此權限用於本機保存名單、顯示欄位與偏好。
- **Are you using remote code?**：選 **No, I am not using remote code**。目前 V0.50 的 JavaScript 都在 ZIP 內，沒有載入外部程式碼；因此不需填寫遠端程式碼 justification。
- **Data usage**：勾選 **Personally identifiable information**，因為使用者可匯入姓名、學號及其他識別欄位，即使只存本機也要揭露。其餘健康、金融、驗證資訊、通訊、位置、瀏覽紀錄、使用者活動追蹤、網站內容等類別，依目前功能不勾選。若日後新增這些用途，須同步改說明及政策。
- **三項 certification**：目前程式沒有販售或轉移資料、沒有將資料用於無關用途，也沒有用於信用評分或放款。請開發者核對實際營運方式後親自勾選三項。
- **Privacy policy URL**：填入 `https://randopal-privacy-policy.cguaacsb.chatgpt.site/`。此頁已公開發佈，並確認不登入即可讀取；原始頁面在 [`privacy-policy.html`](privacy-policy.html)。

## 上傳前檢查

1. 先從 `chrome://extensions` 的「載入未封裝項目」測試 `extension/`。若曾載入舊版，按該擴充套件的重新載入，再重新開啟視窗，新圖示才會更新。
2. 上傳 ZIP，選分類和語言；分別貼入中文與英文說明，並上傳對應截圖。圖示檔在 ZIP 裡，也另備一份供商店欄位選取。
3. 完成隱私權與 `storage` 權限說明，核對預覽，再送審。上架動作由開發者帳號完成。

官方文件：[填寫商店資訊](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)、[圖像規格](https://developer.chrome.com/docs/webstore/images)、[撰寫好的商店頁](https://developer.chrome.com/docs/webstore/best-listing)、[關鍵字政策](https://developer.chrome.com/docs/webstore/program-policies/listing-requirements)。
