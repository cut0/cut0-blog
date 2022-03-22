import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, VFC } from "react";
import Select from "react-select";
import { ArticleResponse, TagResponse } from "../../../api-client";
import { useArticleListInfinite } from "../../hooks/article";
import { useIntersection } from "../../hooks/common/intersectionHooks";
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

type ContentProps = {
  tagId?: string;
  category: "recently" | "pick-up";
  baseArticleData: {
    tagId: string | null;
    category: string;
    data: ArticleResponse[];
  }[];
};

const BlogList: VFC<ContentProps> = ({ tagId, category, baseArticleData }) => {
  const initialData = baseArticleData.find((item) => {
    if (!tagId) {
      return item.category === category && item.tagId === null;
    }
    return item.category === category && item.tagId === tagId;
  })?.data;

  const { articleList, error, fetchArticleList, loading } =
    useArticleListInfinite({ category, tagId }, initialData);

  const el = useIntersection({}, () => fetchArticleList());

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
      {articleList && articleList?.length > 0 && <div ref={el} />}
    </>
  );
};

type HomeContentProps = {
  baseArticleData: {
    tagId: string | null;
    category: string;
    data: ArticleResponse[];
  }[];
  tagList: TagResponse[];
};

export const HomeContent: VFC<HomeContentProps> = ({
  baseArticleData,
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
                router.push({ query: { ...router.query, tagId: e?.value } })
              }
            />
          </div>
        </div>
      </nav>
      <section className={ArticleListWrapper}>
        <div className={ArticleListContainer}>
          <>
            {category === "recently" && (
              <BlogList
                baseArticleData={baseArticleData}
                category={"recently"}
                tagId={Array.isArray(tagId) ? tagId[0] : tagId}
              />
            )}
            {category === "pick-up" && (
              <BlogList
                baseArticleData={baseArticleData}
                category={"pick-up"}
                tagId={Array.isArray(tagId) ? tagId[0] : tagId}
              />
            )}
          </>
        </div>
      </section>
    </>
  );
};
