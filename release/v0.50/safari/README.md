# Safari routes

**Website:** Open RandoPal directly in Safari. The local Mac preview is `http://localhost:4173/index.html`. For general access or iPhone/iPad Home Screen installation, host `../ios/webapp/` at an HTTPS URL. Safari on Mac can add the hosted site to the Dock.

**Safari Web Extension:** Apple’s `safari-web-extension-converter` generated `RandoPal/RandoPal.xcodeproj` with macOS and iOS targets. Open it in Xcode, choose your Team, replace the example bundle identifier `com.randopal.safari` with your unique ID, build and install the containing app, then enable RandoPal in Safari Extensions settings. The same iOS target covers iPhone and iPad. Apple Developer Program membership is required for App Store distribution.

The macOS and iOS Simulator SDK schemes compiled without signing. No real Safari run was completed. Check popup appearance, local data storage, import, export, and sound on physical devices before submission.

The Safari extension source contains the Traditional Chinese / English interface and localized extension metadata. Use the top-bar language selector inside RandoPal.

Regenerate after modifying the web app (from the project root):

```sh
npm run package:all
```

This runs Apple’s converter, reapplies the 0.50.0 Xcode version to all Safari targets, and creates the ZIP. It replaces the generated Xcode project; set your Team and bundle identifier again afterward if you changed them locally.

Official docs: https://developer.apple.com/documentation/safariservices/packaging-a-web-extension-for-safari

