import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import type { AppProps } from "next/app";
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";
import { useEffect } from "react";
import { Header } from "../components/common/Header";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
