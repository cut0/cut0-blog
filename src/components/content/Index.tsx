import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, VFC } from "react";
import Select from "react-select";
import { ArticleResponse, TagResponse } from "../../../api-client";
import { useArticleList } from "../../hooks/article";
import { ArticleCard } from "../article/ArticleCard";

import {
  ArticleListWrapper,
  ArticleListContainer,
  ArticleContainer,
  NavWrapper,
  NavContainer,
  NavLinksContainer,
  NavLinkElement,
  NavSearchContainer,
  SelectedNavElement,
} from "./Index.css";

type ArticleListProps = {
  tagId?: string;
  category: "recently" | "pick-up";
  baseArticleList: ArticleResponse[];
};

const ArticleList: VFC<ArticleListProps> = ({
  tagId,
  category,
  baseArticleList,
}) => {
  const initialData = useMemo(() => {
    return baseArticleList
      .filter((article) => {
        if (category === "pick-up") {
          return article.isPicked;
        }
        return true;
      })
      .filter((article) => {
        if (!!tagId) {
          return article.tags.some((tag) => {
            return tag.id === tagId;
          });
        }
        return true;
      });
  }, [baseArticleList, category, tagId]);

  const { articleList, error, loading } = useArticleList(
    { category, tagId },
    initialData,
  );

  return (
    <>
      {loading && <p>ローディング中です</p>}
      {error && <p>エラーが発生しました</p>}
      {articleList &&
        articleList.map((article, index) => {
          return (
            <div className={ArticleContainer} key={index}>
              <ArticleCard article={article} />
            </div>
          );
        })}
    </>
  );
};

type HomeContentProps = {
  articleList: ArticleResponse[];
  tagList: TagResponse[];
};

export const HomeContent: VFC<HomeContentProps> = ({
  articleList,
  tagList,
}) => {
  const router = useRouter();
  const {
    query: { category, tagId },
  } = router;

  const tagOptions = useMemo(
    () =>
      tagList.map((tag) => {
        return { value: tag.id, label: tag.name };
      }),
    [tagList],
  );

  useEffect(() => {
    if (router.isReady && category === undefined)
      router.replace({ query: { ...router.query, category: "recently" } });
  }, [category, router]);

  return (
    <>
      <nav className={NavWrapper}>
        <div className={NavContainer}>
          <div className={NavLinksContainer}>
            <Link
              href={{ query: { ...router.query, category: "recently" } }}
              scroll={false}
            >
              <a
                className={`${NavLinkElement} ${
                  category === undefined || category === "recently"
                    ? SelectedNavElement
                    : ""
                }`}
              >
                Recently
              </a>
            </Link>
            <Link
              href={{ query: { ...router.query, category: "pick-up" } }}
              scroll={false}
            >
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
              onChange={(e) =>
                router.push(
                  { query: { ...router.query, tagId: e?.value } },
                  undefined,
                  { scroll: false },
                )
              }
            />
          </div>
        </div>
      </nav>
      <section className={ArticleListWrapper}>
        <div className={ArticleListContainer}>
          {(category === "recently" || category === "pick-up") && (
            <ArticleList
              baseArticleList={articleList}
              category={category}
              tagId={Array.isArray(tagId) ? tagId[0] : tagId}
            />
          )}
        </div>
      </section>
    </>
  );
};
