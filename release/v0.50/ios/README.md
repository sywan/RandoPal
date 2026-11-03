# iPhone and iPad installation

**Safari web app:** Upload the contents of `webapp/` to an HTTPS site, open its URL in Safari on iPhone or iPad, then choose Share → Add to Home Screen. The first visit needs network to cache the offline files. A Mac's `localhost` address does not serve the phone. The web app ZIP is ready to upload to a host; no Apple developer membership is needed for this route.

**Native app:** Open `native/RandoPal.xcodeproj` in Xcode. Replace the example bundle identifier, choose your Apple Team, connect your iPhone or iPad, and press Run. One Xcode target supports both device families. A signed `.ipa` cannot be supplied without your signing identity. App Store/TestFlight distribution requires Apple Developer Program membership and review.

**Safari extension:** See `../safari/README.md`; it is a separate Xcode container app and can target both macOS and iOS/iPadOS Safari.

Both the Web App and native App contain the same Traditional Chinese / English interface and language preference.

Native source compiled for the iOS Simulator SDK without signing. Simulator and physical-device execution have not been verified here because the machine's CoreSimulator service is incompatible with its Xcode installation.

Apple instructions: https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios

