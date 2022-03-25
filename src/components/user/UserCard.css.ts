import { style } from "@vanilla-extract/css";

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
  backgroundColor: "#939CA3",
});

export const UserInfo = style({});

export const UserName = style({ fontWeight: "bold" });

export const UserDescription = style({ color: "#B7B8C0" });
