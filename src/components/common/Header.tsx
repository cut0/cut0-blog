import { useRouter } from "next/router";
import { VFC } from "react";
import { HeaderWrapper, HeaderContainer, HeaderTitle } from "./Header.css";

export const Header: VFC<{}> = () => {
  const router = useRouter();
  return (
    <header className={HeaderWrapper}>
      <div className={HeaderContainer}>
        <h1
          className={HeaderTitle}
          onClick={() => router.push({ pathname: "/" })}
        >
          Cut0 Blog
        </h1>
      </div>
    </header>
  );
};
