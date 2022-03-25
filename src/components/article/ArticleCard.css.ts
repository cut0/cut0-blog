import { style } from "@vanilla-extract/css";

export const Card = style({
  borderRadius: "16px",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.2s",
  boxShadow: "0 1px 10px -4px #c6c8ca",
  ":hover": {
    transform: "scale(1.05, 1.05)",
    color: "#0697F9",
  },
});

export const ArticleBookmarkContainer = style({
  position: "absolute",
  right: 0,
  top: 0,
  borderRadius: "0 16px 0 16px",
  width: "64px",
  height: "64px",
  backgroundColor: "white",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ArticleEyecatchContainer = style({
  height: "192px",
  position: "relative",
  borderRadius: "16px 16px 0 0",
});

export const ArticleEyecatch = style({
  backgroundColor: "#939CA3",
  borderRadius: "16px 16px 0 0",
});

export const ArticleInfoContainer = style({
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "0 0 16px 16px",
});

export const ArticleTitle = style({
  fontWeight: "bold",
  fontSize: "1rem",
  margin: 0,
});

export const ArticleTagsContainer = style({
  padding: "16px 0",
  display: "flex",
  flexWrap: "wrap",
  height: "74px",
});

export const ArticleTag = style({
  fontSize: "0.875rem",
  color: "#0697F9",
  paddingRight: "8px",
});

export const UserInfoContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const UserEyecatchContainer = style({
  height: "36px",
  width: "36px",
  position: "relative",
});

export const UserEyecatch = style({
  borderRadius: "50%",
  backgroundColor: "#939CA3",
});

export const UserInfo = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "8px",
});

export const UserName = style({
  fontSize: "0.875rem",
  color: "initial",
});

export const PublishedAt = style({
  fontSize: "0.75rem",
  color: "initial",
});
