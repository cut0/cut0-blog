interface Window {
  gtag(type: "config", googleAnalyticsId: string, { page_path: string });
}

declare namespace ImportMeta {
  interface ImportMetaEnv {
    PUBLIC_API_KEY: string;
    PUBLIC_END_POINT: string;
    PUBLIC_SERVICE_DOMAIN: string;
    PUBLIC_GA_ID: string;
    MODE: string;
  }
}
