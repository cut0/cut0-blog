import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { Partytown } from "@builder.io/partytown/react";
import { existGaId, GA_ID } from "../utils/analytics";

class Document extends NextDocument<{}> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link href="/favicons/favicon.ico" rel="icon" />
          <link
            href="/cut0-blog-ios.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link href="/manifest.json" rel="manifest" />
          <meta content="#2B2B2E" name="theme-color" /> {/* Google Analytics */}
          {existGaId && (
            <>
              <Partytown debug={false} forward={["dataLayer.push"]} />
              <script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                type="text/partytown"
                async
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
                type="text/partytown"
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/registerServiceWorker.js" defer />
        </body>
      </Html>
    );
  }
}

export default Document;
