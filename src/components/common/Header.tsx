import Link from "next/link";
import { FC } from "react";
import { homePath } from "../../utils/pagePath";
import { HeaderWrapper, HeaderContainer, HeaderTitle } from "./Header.css";

export const Header: FC<{}> = () => {
  return (
    <header className={HeaderWrapper}>
      <div className={HeaderContainer}>
        <Link href={homePath()} passHref>
          <h1 className={HeaderTitle}>Cut0 Blog</h1>
        </Link>
      </div>
    </header>
  );
};
