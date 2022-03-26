import { style } from "@vanilla-extract/css";
import { colorPalet } from "../../utils/color";

export const errorToastContent = style({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: `${colorPalet.error}`,
  borderRadius: "16px",
});

export const closeIconContainer = style({
  color: `${colorPalet.lightText}`,
  cursor: "pointer",
});

export const errorMessage = style({
  margin: 0,
  color: `${colorPalet.lightText}`,
  paddingLeft: "8px",
});
