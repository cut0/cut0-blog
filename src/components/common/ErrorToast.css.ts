import { style } from "@vanilla-extract/css";

export const errorToastContent = style({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#E53E3E",
  borderRadius: "16px",
});

export const closeIconContainer = style({ color: "white", cursor: "pointer" });

export const errorMessage = style({
  margin: 0,
  color: "white",
  paddingLeft: "8px",
});
