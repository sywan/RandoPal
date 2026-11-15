# RandoPal V0.65 · Chrome extension package

V0.65 adds a row-and-column seat map builder to Seat Shuffle. Enter the number of columns across and rows deep, create a new map, then tap seats to block or reopen them. The stage marker shows the front of the room. Imported seat maps remain available, and the selected map and blocked seats are saved locally.

The upload file is [RandoPal-chrome-v0.65.zip](RandoPal-chrome-v0.65.zip). Its root contains `manifest.json` with version `0.65.0`. Upload it to the **existing** RandoPal Chrome Web Store item; do not create another item. The published Store version will remain the previous version until this package has been reviewed and published. Existing Store installations can then receive the update automatically after Chrome checks for updates and the extension is idle. For an immediate check, close any open extension page, visit `chrome://extensions`, enable Developer mode, and click **Update**. An unpacked test copy does not update from the Store.

The only extension permission is `storage`. The current privacy policy is [privacy-policy.html](privacy-policy.html), published at `https://sywan.github.io/RandoPal/privacy-policy.html`. The V0.64 Store listing text and assets are archived in `release/v0.64/chrome/`; update the Store description and screenshots to mention the new seat map builder when submitting V0.65.

Build from the repository root with `npm test && npm run package`.
