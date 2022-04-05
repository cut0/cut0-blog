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
  tagId: string;
};

export const getStaticProps = async ({
  params: { tagId },
}: {
  params: { tagId: string };
}): Promise<GetStaticPropsResult<HomeProps>> => {
  const [articleList, tagList] = await Promise.all([
    getArticleList.handler({
      filters: createArticleFilter({ category: "recently", tagId }),
    }),
    getTagList.handler({
      filters: createTagFilter(),
    }),
  ]);

  return {
    props: { articleList, tagList, tagId },
  };
};

export const getStaticPaths = async () => {
  const tagList = await getTagList.handler({});
  return {
    paths: tagList.map((tag) => `/recently/${tag.id}`),
    fallback: false,
  };
};

const Page: NextPage<HomeProps> = ({ articleList, tagList, tagId }) => {
  return (
    <HomeContent
      baseArticleList={articleList}
      category="recently"
      tagId={tagId}
      tagList={tagList}
    />
  );
};

export default Page;
