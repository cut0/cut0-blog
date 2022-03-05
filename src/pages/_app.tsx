import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
