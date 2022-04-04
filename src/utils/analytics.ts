export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const existGaId = GA_ID !== "";

export const pageView = (path: string) => {
  if (!existGaId) return;
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};
