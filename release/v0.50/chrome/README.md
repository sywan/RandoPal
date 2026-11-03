# Chrome Web Store preparation

1. Test `extension/` with `chrome://extensions` → Developer mode → Load unpacked.
2. Open [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) and create a new item.
3. Upload `RandoPal-chrome-v0.50.zip` as is. `manifest.json` is at the archive root.
4. Use the upload-ready screenshots in `store-assets/` and the copy in `STORE-LISTING.md`. Check the [image requirements](https://developer.chrome.com/docs/webstore/images) before submission.
5. Complete the Privacy tab using `PRIVACY.md` as a factual draft. Explain that `storage` saves rosters and preferences locally.
6. Submit for review. For updates, increase `manifest.json` version and upload a newly built ZIP.

The ZIP includes `src/i18n.js` for the App interface and `_locales/zh_TW`, `_locales/en` for the extension name and description. The user can switch languages in the top bar. Add English listing text in the store dashboard if you want the full store page localized.

Ready-to-paste Traditional Chinese and English descriptions, category and language choices, screenshot filenames, and privacy field drafts are in [`STORE-LISTING.md`](STORE-LISTING.md).

Official publishing instructions: https://developer.chrome.com/docs/webstore/publish/

