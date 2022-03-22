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

export const HeaderTitle = style({ margin: 0, padding: "8px 0" });
