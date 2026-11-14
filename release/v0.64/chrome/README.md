# RandoPal V0.64 · Chrome Web Store update

Upload **[RandoPal-chrome-v0.64.zip](RandoPal-chrome-v0.64.zip)** to the **existing** RandoPal item in the Chrome Web Store Developer Dashboard. Do not create a new item: keeping the same listing keeps the extension ID and allows installed Store copies to update automatically after publication.

The ZIP includes `manifest.json` at its root with version `0.64.0`, both locales, all 15 activities, `src/ladder.js`, and the current Guga animation. Its only requested permission is `storage`. The prior V0.55 ZIP remains in `release/v0.55/chrome/`.

## Before uploading

1. Run `npm test` and `npm run package` from the repository root.
2. Open `chrome://extensions`, turn on Developer mode, choose **Load unpacked**, and select this directory's generated `extension/` folder. Test the current activities, roster import, progress memory, language switch, and presentation mode. The unpacked copy is for testing; upload the ZIP to the Store.
3. Check the [Store listing copy](STORE-LISTING.md) and [privacy notes](PRIVACY.md). A current policy copy is [privacy-policy.html](privacy-policy.html) and is published at `https://sywan.github.io/RandoPal/privacy-policy.html`.

## Update the existing Store item

1. Sign in to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/) and open the **existing RandoPal** item.
2. On **Package**, choose **Upload New Package** and select `RandoPal-chrome-v0.64.zip`. Confirm the pending version is `0.64.0`.
3. Review **Store listing**. Use the updated descriptions in `STORE-LISTING.md`; keep or refresh the screenshots and promotional assets as appropriate. The old screenshot files in `release/v0.55/chrome/store-assets/` show V0.55 and should not be described as V0.64 captures.
4. Review **Privacy practices**. The single purpose remains random activities based on user-provided rosters. Explain `storage` as local saving of rosters, game progress, results, and preferences. Select no remote code: all JavaScript ships in the ZIP. Verify data declarations against the actual user data you allow. Set the privacy policy URL to `https://sywan.github.io/RandoPal/privacy-policy.html` after confirming it opens publicly.
5. Save the tabs, then choose **Submit for Review**. If you want the approved update to go live automatically, leave automatic publishing enabled. Otherwise select deferred publishing and return to publish after approval.
6. Once the item says **Published**, verify the Store listing and version. Installed Store copies normally update automatically after Chrome checks for updates and the extension is idle; locally unpacked copies are separate and do not receive Store updates.

Uploading or submitting a draft does not update installed copies. Keep the old ZIP until the new release is live.

Official references: [Update an item](https://developer.chrome.com/docs/webstore/update), [extension update lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/extensions-update-lifecycle).
