import type { NextPage, GetStaticPropsResult } from "next";
import {
  ArticleResponse,
  getArticleList,
  getTagList,
  TagResponse,
} from "../../../api-client";
import { HomeContent } from "../../components/content/HomeContent";
import { createArticleFilter } from "../../modules/article/articleFilter";
import { createTagFilter } from "../../modules/tag/tagFilter";

type HomeProps = {
  tagList: TagResponse[];
  articleList: ArticleResponse[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const [articleList, tagList] = await Promise.all([
    getArticleList.handler({
      filters: createArticleFilter({ category: "pick-up" }),
    }),
    getTagList.handler({
      filters: createTagFilter(),
    }),
  ]);

  return {
    props: { articleList, tagList },
  };
};

const Page: NextPage<HomeProps> = ({ articleList, tagList }) => {
  return (
    <HomeContent
      baseArticleList={articleList}
      category="pick-up"
      tagList={tagList}
    />
  );
};

export default Page;
