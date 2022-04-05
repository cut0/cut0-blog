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
  tagId: string;
  tagList: TagResponse[];
  articleList: ArticleResponse[];
};

export const getStaticProps = async ({
  params: { tagId },
}: {
  params: { tagId: string };
}): Promise<GetStaticPropsResult<HomeProps>> => {
  const [articleList, tagList] = await Promise.all([
    getArticleList.handler({
      filters: createArticleFilter({ category: "pick-up", tagId }),
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
    paths: tagList.map((tag) => `/pick-up/${tag.id}`),
    fallback: false,
  };
};

const Page: NextPage<HomeProps> = ({ articleList, tagList, tagId }) => {
  return (
    <HomeContent
      baseArticleList={articleList}
      category="pick-up"
      tagId={tagId}
      tagList={tagList}
    />
  );
};

export default Page;
