import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, VFC } from "react";
import Select from "react-select";
import { BlogContentResponse, TagResponse } from "../../../api-client";
import { useBlogContentListInfinite } from "../../hooks/blogContent";
import { useIntersection } from "../../hooks/common/intersectionHooks";
import { BlogContentCard } from "../blogContent/BlogContentCard";

import {
  BlogContentListWrapper,
  BlogContentListContainer,
  BlogContentContainer,
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
  baseBlogContentData: {
    tagId: string | null;
    category: string;
    data: BlogContentResponse[];
  }[];
};

const BlogList: VFC<ContentProps> = ({
  tagId,
  category,
  baseBlogContentData,
}) => {
  const initialData = baseBlogContentData.find((item) => {
    if (!tagId) {
      return item.category === category && item.tagId === null;
    }
    return item.category === category && item.tagId === tagId;
  })?.data;

  const { blogContentList, error, fetchBlogContentList, loading } =
    useBlogContentListInfinite({ category, tagId }, initialData);

  const el = useIntersection({}, () => fetchBlogContentList());

  return (
    <>
      {loading && <p>ローディング中です</p>}
      {error && <p>エラーが発生しました</p>}
      {blogContentList &&
        blogContentList.map((blogContent, index) => {
          return (
            <div className={BlogContentContainer} key={index}>
              <BlogContentCard blogContent={blogContent} />
            </div>
          );
        })}
      {blogContentList && blogContentList?.length > 0 && <div ref={el} />}
    </>
  );
};

type HomeContentProps = {
  baseBlogContentData: {
    tagId: string | null;
    category: string;
    data: BlogContentResponse[];
  }[];
  tagList: TagResponse[];
};

export const HomeContent: VFC<HomeContentProps> = ({
  baseBlogContentData,
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
      <section className={BlogContentListWrapper}>
        <div className={BlogContentListContainer}>
          <>
            {category === "recently" && (
              <BlogList
                baseBlogContentData={baseBlogContentData}
                category={"recently"}
                tagId={Array.isArray(tagId) ? tagId[0] : tagId}
              />
            )}
            {category === "pick-up" && (
              <BlogList
                baseBlogContentData={baseBlogContentData}
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
