# RandoPal V0.50 packages

Open [the interactive deployment guide](../../deployment-guide.html) first. It is a single offline-capable HTML file with Chinese/English tabs for every platform.

All packages share the same Traditional Chinese / English App interface. The top-bar language toggle saves the choice locally. Extension store metadata is localized in `_locales/` within the Chrome and Edge ZIPs. The new blue wheel logo is included in every package, and pick progress remains visible in presentation mode.

Chrome Web Store copy, icon, screenshots, and optional promo images are ready in [chrome/STORE-LISTING.md](chrome/STORE-LISTING.md).

On macOS, `npm run package:all` rebuilds every package, including the Safari project. The Safari packaging script also sets its Xcode project version to 0.50.0.

| Target | Package | Local test |
|---|---|---|
| Chrome desktop | `chrome/RandoPal-chrome-v0.50.zip` | `chrome://extensions` → Developer mode → Load unpacked `chrome/extension/` |
| Edge desktop | `edge/RandoPal-edge-v0.50.zip` | `edge://extensions` → Developer mode → Load unpacked `edge/extension/` |
| Safari macOS / iOS / iPadOS | `safari/RandoPal-Safari-Source-v0.50.zip` | Open `safari/RandoPal/RandoPal.xcodeproj` in Xcode |
| iPhone / iPad web app | `ios/RandoPal-iOS-WebApp-v0.50.zip` | Host `ios/webapp/` on HTTPS, then Safari → Add to Home Screen |
| iPhone / iPad native app | `ios/RandoPal-iOS-Native-Source-v0.50.zip` | Open `ios/native/RandoPal.xcodeproj` in Xcode |

Chrome and Edge packages contain a Manifest V3 extension with the manifest at ZIP root. Safari and native iOS packages are **source projects**, not signed installer files. The owner must set their Apple Team and unique bundle ID before installing on a device or submitting to Apple.

Build verification: `npm test`; `npm run package`; native iOS, Safari macOS, and Safari iOS Xcode schemes compiled without signing. The local CoreSimulator service is incompatible with the installed Xcode, so no Simulator or real-device run was completed.

