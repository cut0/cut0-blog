import { PropsWithChildren, VFC } from "react";
import { pageContainer, pageContent } from "./CommonLayout.css";

export const CommonLayout: VFC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <div className={pageContainer}>
        <div className={pageContent}>{children}</div>
      </div>
    </>
  );
};
