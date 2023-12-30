interface Window {
  gtag(type: "config", googleAnalyticsId: string, { page_path: string });
}

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
