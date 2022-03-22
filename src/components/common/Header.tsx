import { VFC } from "react";
import { HeaderWrapper, HeaderContainer, HeaderTitle } from "./Header.css";

export const Header: VFC<{}> = () => {
  return (
    <header className={HeaderWrapper}>
      <div className={HeaderContainer}>
        <h1 className={HeaderTitle}>Cut0 Blog</h1>
      </div>
    </header>
  );
};
