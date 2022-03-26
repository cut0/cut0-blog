import { globalStyle } from "@vanilla-extract/css";
import { colorPalet } from "../utils/color";

globalStyle("html, body", {
  color: `${colorPalet.text}`,
});
