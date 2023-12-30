interface ImportMetaEnv {
  readonly PUBLIC_END_POINT: string;
  readonly PUBLIC_API_KEY: string;
  readonly PUBLIC_SERVICE_DOMAIN: string;
  readonly PUBLIC_GA_ID: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
