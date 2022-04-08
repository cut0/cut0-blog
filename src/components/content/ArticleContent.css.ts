import { style } from "@vanilla-extract/css";
import { colorPalet } from "../../utils/color";

export const ArticleWrapper = style({
  backgroundColor: `${colorPalet.lightBackground}`,
  minHeight: "calc(100vh - 52px)",
});

export const ArticleContainer = style({
  maxWidth: "900px",
  margin: "0 auto",
  paddingBottom: "64px",
});

export const Article = style({
  borderRadius: "16px",
  backgroundColor: `${colorPalet.hightLightBackground}`,
  padding: "40px",
});

export const ArticleTitleContainer = style({
  display: "flex",
  justifyContent: "center",
  padding: "48px 32px 0",
  margin: 0,
});

export const ArticlePublishedAt = style({
  display: "block",
  textAlign: "center",
  padding: "32px 0",
});

export const ArticleUserContainer = style({
  paddingTop: "40px",
  position: "relative",
  selectors: {
    "&:before": {
      content: "",
      width: "100%",
      height: "2px",
      position: "absolute",
      backgroundColor: `${colorPalet.borderBackground}`,
      top: 0,
    },
  },
});
