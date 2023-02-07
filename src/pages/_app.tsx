import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "../styles/global.css";
import Script from "next/script";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Header } from "../components/common/Header";
import { usePageView } from "../hooks/common/analyticsHooks";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  usePageView();

  return (
    <>
      <Script src="https://embed.zenn.studio/js/listen-embed-event.js"></Script>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
