declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

interface Window {
  gtag(type: "config", googleAnalyticsId: string, { page_path: string });
}
