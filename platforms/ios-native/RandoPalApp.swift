import SwiftUI
import WebKit

@main
struct RandoPalApp: App {
    var body: some Scene {
        WindowGroup {
            RandoPalWebView()
                .ignoresSafeArea(edges: .bottom)
        }
    }
}

struct RandoPalWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        let view = WKWebView(frame: .zero, configuration: configuration)
        view.scrollView.contentInsetAdjustmentBehavior = .never
        view.backgroundColor = UIColor(red: 0.96, green: 0.98, blue: 1.0, alpha: 1)
        guard let page = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "WebAssets") else {
            assertionFailure("Bundled WebAssets/index.html is missing")
            return view
        }
        view.loadFileURL(page, allowingReadAccessTo: page.deletingLastPathComponent())
        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}
