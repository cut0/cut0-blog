import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState, VFC } from "react";
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

  const { articleList, error, loading } = useArticleList(
    { category, tagId },
    baseArticleList,
  );

  const router = useRouter();

  return (
    <>
      <nav className={NavWrapper}>
        <div className={NavContainer}>
          <div className={NavLinksContainer}>
            <Link
              href={{ pathname: `/recently${tagId ? `/${tagId}` : ""}` }}
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
              href={{ pathname: `/pick-up${tagId ? `/${tagId}` : ""}` }}
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
              onChange={(e) => {
                if (
                  router.pathname === "/recently" ||
                  router.pathname === "/recently/[tagId]"
                ) {
                  router.push({ pathname: `/recently/${e?.value}` });
                }
                if (
                  router.pathname === "/pick-up" ||
                  router.pathname === "/pick-up/[tagId]"
                ) {
                  router.push({ pathname: `/pick-up/${e?.value}` });
                }
                console.log(router);
              }}
            />
          </div>
        </div>
      </nav>
      <div className={ArticleListWrapper}>
        <div className={ArticleListContainer}>
          {loading && <p>ローディング中です</p>}
          {error && <p>エラーが発生しました</p>}
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
