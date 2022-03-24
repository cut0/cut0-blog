import { style } from "@vanilla-extract/css";

export const HeaderWrapper = style({
  backgroundColor: "white",
  zIndex: 1,
});

export const HeaderContainer = style({
  maxWidth: "900px",
  height: "100%",
  margin: "0 auto",
  padding: "0 16px",
});

export const HeaderTitle = style({
  margin: 0,
  fontSize: "1.5rem",
  padding: "8px 0",
  cursor: "pointer",
});
