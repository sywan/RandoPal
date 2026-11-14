# RandoPal 玩法路線圖 / Activity Roadmap

## 目前已完成 / Available now

網頁版 V0.59 共有 10 種玩法，依使用情境分為四類。一次只呈現所選類別內的玩法，投影模式則聚焦於目前的活動。Chrome 擴充功能仍維持 V0.55。

| 分類 / Category | 已完成玩法 / Available activities |
| --- | --- |
| 快速暖場 / Quick moments | 隨機抽選 Random Pick、任務盲盒 Challenge Draw |
| 安排流程 / Plan the flow | 隨機排序 Random Order、智慧分組 Smart Groups、角色輪盤 Role Shuffle |
| 團隊交流 / Team exchange | 小組配對 Team Matching、互評巡迴 Review Circuit |
| 卡片創意 / Card creativity | 創意混搭 Idea Mixer、驚喜事件卡 Twist Cards、話題賓果 Conversation Bingo |

The web app has ten activities in four categories. Only the selected category is shown, and presentation mode focuses on the active activity. The Chrome extension remains V0.55.

## 後續四種玩法 / Four remaining ideas

卡片創意這一批已在 V0.59 完成。**建議把其餘四種分兩批推出。** 每批共用一種核心資料模型或規則，完成後可先讓使用者試玩與回饋，再決定下一批的細節。下列版號是規劃目標，不代表已發布。

Card creativity shipped in V0.59. **Ship the remaining four in two batches.** Each batch shares a core data model or rule, so it can be tested with users before the next batch. Version numbers below are planning targets, not released versions.

| 建議批次 / Proposed batch | 玩法 / Activities | 共用基礎與完成條件 / Shared foundation and acceptance |
| --- | --- | --- |
| V0.60 · 公平輪換 / Fair rotation | 換桌交流 Mixer Rounds、公平輪值 Fair Turn | 建立跨輪紀錄，降低重複搭檔與同一人連續被選中的機率；讓使用者能重設紀錄。Track rounds to reduce repeat partners and repeated selection; allow history reset. |
| V0.61 · 場地與競賽 / Spaces and contests | 座位冒險 Seat Shuffle、提案擂台 Bracket Builder | 匯入座位或活動站，支援不可用位置；對戰表處理奇數輪空與逐輪結果。Import seats or stations with unavailable spots; handle byes and round progression in brackets. |

每批都應驗證繁中與英文、CSV／Excel 多欄匯入、投影模式、手機尺寸和結果匯出。若實際課堂或團建回饋顯示某個玩法更急需，可調整批次順序，不必改變四個分類。

Each batch should verify Chinese and English, multi-column CSV/Excel import, presentation mode, mobile layout, and export. User feedback may reorder the batches without changing the four navigation categories.
