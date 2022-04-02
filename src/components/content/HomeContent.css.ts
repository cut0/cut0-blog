import { style } from "@vanilla-extract/css";
import { colorPalet } from "../../utils/color";

export const ErrorToastContainer = style({
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 0)",
  WebkitTransform: "translate(-50%, 0)",
  msTransform: "translate(-50%, 0)",
  zIndex: 200,
});

export const NavWrapper = style({
  backgroundColor: `${colorPalet.darkBackground}`,
  position: "sticky",
  top: 0,
  zIndex: 100,
});

export const NavContainer = style({
  maxWidth: "900px",
  height: "100%",
  margin: "0 auto",
  padding: "0 16px",
  display: "flex",
  justifyContent: "space-between",
});

export const NavLinksContainer = style({
  display: "flex",
  alignItems: "flex-end",
});

export const NavLinkElement = style({
  fontWeight: "bold",
  padding: "8px 0px 8px 0px",
  marginRight: "16px",
  position: "relative",
  color: "#B7B8C0",
  textDecoration: "none",
});

export const SelectedNavElement = style({
  color: `${colorPalet.lightText}`,
  "::after": {
    content: "",
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: `${colorPalet.hightLightBackground}`,
    height: "2px",
    width: "100%",
  },
});

export const NavSearchContainer = style({ padding: "8px 0" });

export const ArticleListWrapper = style({
  backgroundColor: `${colorPalet.lightBackground}`,
  minHeight: "100vh",
  paddingTop: "8px",
});

export const ArticleListContainer = style({
  maxWidth: "900px",
  margin: "0 auto",
  display: "grid",
  gap: 0,
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
});

export const ArticleContainer = style({ padding: "8px" });
