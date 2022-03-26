import { style } from "@vanilla-extract/css";
import { colorPalet } from "../../utils/color";

export const HeaderWrapper = style({
  backgroundColor: `${colorPalet.darkBackground}`,
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
  color: `${colorPalet.lightText}`,
});
