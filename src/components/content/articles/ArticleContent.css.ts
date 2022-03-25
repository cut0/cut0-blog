import { style } from "@vanilla-extract/css";

export const ArticleWrapper = style({
  backgroundColor: "#EAEAEA",
  minHeight: "calc(100vh - 52px)",
});

export const ArticleContainer = style({
  maxWidth: "900px",
  margin: "0 auto",
  paddingBottom: "32px",
});

export const Article = style({
  borderRadius: "16px",
  backgroundColor: "white",
  padding: "40px",
});

export const ArticleTitle = style({
  textAlign: "center",
  padding: "32px",
  margin: 0,
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
      backgroundColor: "#E4EDF4",
      top: 0,
    },
  },
});
