import { style } from "@vanilla-extract/css";
import { colorPalet } from "../../utils/color";

export const Content = style({
  display: "grid",
  gridTemplateColumns: "64px 1fr",
  columnGap: "16px",
});

export const EyecatchContainer = style({
  height: "64px",
  width: "64px",
  position: "relative",
});

export const UserEyecatch = style({
  borderRadius: "50%",
  backgroundColor: `${colorPalet.loadingBackground}`,
});

export const UserInfo = style({});

export const UserName = style({ fontSize: "1.25rem", fontWeight: "bold" });

export const UserDescription = style({
  padding: "8px 0",
  margin: 0,
  color: `${colorPalet.subText}`,
});
