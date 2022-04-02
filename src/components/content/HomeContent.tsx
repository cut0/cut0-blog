import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState, VFC } from "react";
import Select from "react-select";
import { ArticleResponse, TagResponse } from "../../../api-client";
import { useArticleList } from "../../hooks/article";
import {
  homePath,
  pickUpPath,
  pickUpTagPath,
  recentlyPath,
  recentlyTagPath,
} from "../../utils/pagePath";
import { ArticleCard } from "../article/ArticleCard";
import { ErrorToast } from "../common/ErrorToast";
import {
  ErrorToastContainer,
  ArticleListWrapper,
  ArticleListContainer,
  ArticleContainer,
  NavWrapper,
  NavContainer,
  NavLinksContainer,
  NavLinkElement,
  NavSearchContainer,
  SelectedNavElement,
} from "./HomeContent.css";

type HomeContentProps = {
  baseArticleList: ArticleResponse[];
  tagList: TagResponse[];
  category: "recently" | "pick-up";
  tagId?: string;
};

export const HomeContent: VFC<HomeContentProps> = ({
  baseArticleList,
  tagList,
  category,
  tagId,
}) => {
  const tagOptions = useMemo(
    () =>
      tagList.map((tag) => {
        return { value: tag.id, label: tag.name };
      }),
    [tagList],
  );

  const { articleList, error } = useArticleList(
    { category, tagId },
    baseArticleList,
  );

  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    setShowErrorToast(!!error);
  }, [error]);

  const router = useRouter();

  return (
    <>
      {showErrorToast && (
        <div className={ErrorToastContainer}>
          <ErrorToast
            closeHandler={() => setShowErrorToast(false)}
            message="データ取得時にエラーが発生しました。"
          />
        </div>
      )}
      <nav className={NavWrapper}>
        <div className={NavContainer}>
          <div className={NavLinksContainer}>
            <Link href={recentlyTagPath({ tagId })} scroll={false}>
              <a
                className={`${NavLinkElement} ${
                  category === "recently" ? SelectedNavElement : ""
                }`}
              >
                Recently
              </a>
            </Link>
            <Link href={pickUpTagPath({ tagId })} scroll={false}>
              <a
                className={`${NavLinkElement} ${
                  category === "pick-up" ? SelectedNavElement : ""
                }`}
              >
                Pick Up
              </a>
            </Link>
          </div>
          <div className={NavSearchContainer}>
            <Select
              aria-label="tag選択"
              defaultValue={tagOptions.find((tag) => tag.value === tagId)}
              id="TagSelectBox"
              instanceId="TagSelectBox"
              name="tags"
              options={tagOptions}
              placeholder="タグを選択"
              closeMenuOnScroll
              closeMenuOnSelect
              isClearable
              onChange={(e) => {
                if (!e?.value) {
                  router.push(homePath());
                  return;
                }
                if (
                  router.asPath === homePath() ||
                  router.asPath === recentlyPath() ||
                  router.asPath === recentlyTagPath({ tagId })
                ) {
                  router.push({
                    pathname: recentlyTagPath({ tagId: e.value }),
                  });
                }
                if (
                  router.pathname === pickUpPath() ||
                  router.pathname === pickUpTagPath({ tagId })
                ) {
                  router.push(pickUpTagPath({ tagId: e.value }));
                }
              }}
            />
          </div>
        </div>
      </nav>
      <div className={ArticleListWrapper}>
        <div className={ArticleListContainer}>
          {articleList && articleList?.length < 1 && <p>データがありません</p>}
          {articleList &&
            articleList.map((article, index) => {
              return (
                <section className={ArticleContainer} key={index}>
                  <ArticleCard article={article} />
                </section>
              );
            })}
        </div>
      </div>
    </>
  );
};
