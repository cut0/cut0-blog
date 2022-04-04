import NextDocument, { Html, Head, Main, NextScript } from "next/document";

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
          <meta content="#2B2B2E" name="theme-color" />
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
