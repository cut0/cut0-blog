import Head from "next/head";
import { VFC, PropsWithChildren } from "react";

type SeoLayoutProps = {
  ogp: {
    pageTitle?: string;
    pageDescription?: string;
    pageImg?: string;
    pageImgWidth?: number;
    pageImgHeight?: number;
    pageType: "website" | "article";
  };
  twitter: {
    card: "summary" | "summary_large_image";
  };
};

const DEFAULT_URL = "https://cut0-blog.vercel.app";
const DEFAULT_TITLE = "Cut0 Blog";
const DEFAULT_DESCRIPTION =
  "理科大に所属しながら主にWebフロントエンドの領域で学生エンジニアをしています。日々の学習や出来事を発信します。";
const DEFAULT_IMG = `${DEFAULT_URL}/cut0-blog.png`;
const DEFAULT_TWITTER_CREATOR = "@_Cut0";

export const SeoLayout: VFC<PropsWithChildren<SeoLayoutProps>> = ({
  children,
  ogp,
  twitter,
}) => {
  const {
    pageTitle,
    pageDescription,
    pageImg,
    pageImgWidth,
    pageImgHeight,
    pageType,
  } = ogp;
  const { card } = twitter;

  const url = DEFAULT_URL;
  const title = pageTitle ? `${pageTitle} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const description = pageDescription ?? DEFAULT_DESCRIPTION;
  const imgUrl = pageImg ?? DEFAULT_IMG;
  const imgWidth = pageImgWidth ?? 1280;
  const imgHeight = pageImgHeight ?? 640;
  const type = pageType;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content="width=device-width,initial-scale=1.0" name="viewport" />
        <meta content={description} name="description" />
        <meta content={url} property="og:url" />
        <meta content={title} property="og:title" />
        <meta content={title} property="og:site_name" />
        <meta content={description} property="og:description" />
        <meta content={type} property="og:type" />
        <meta content={imgUrl} property="og:image" />
        <meta content={String(imgWidth)} property="og:image:width" />
        <meta content={String(imgHeight)} property="og:image:height" />
        {/*twitter ogp*/}
        <meta content={card} name="twitter:card" />
        <meta content={DEFAULT_TWITTER_CREATOR} name="twitter:creator" />
        <meta content={title} property="twitter:title" />
        <meta content={url} property="twitter:url" />
        <meta content={description} property="twitter:description" />
        <meta content={imgUrl} property="twitter:image" />
        <meta content={url} property="twitter:domain" />
        {/*canonical */}
      </Head>
      {children}
    </>
  );
};
