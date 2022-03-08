import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";

import type { AppProps } from "next/app";
import { initializeMock } from "../../mocks";

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (process.env.NODE_ENV === "development") {
    initializeMock();
  }
  return <Component {...pageProps} />;
};

export default MyApp;
