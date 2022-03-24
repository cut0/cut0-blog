import type { NextPage, GetStaticPropsResult } from "next";
import {
  ArticleResponse,
  getArticleList,
  getTagList,
  TagResponse,
} from "../../../api-client";
import { HomeContent } from "../../components/content/Index";

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
  const fields = "description,title,tags,users,eyecatch,isPicked";
  const [articleList, tagList] = await Promise.all([
    getArticleList.handler({
      fields,
      filters: `(tags[contains]${tagId})`,
    }),
    getTagList.handler({}),
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
    <>
      <HomeContent
        baseArticleList={articleList}
        category="recently"
        tagId={tagId}
        tagList={tagList}
      />
    </>
  );
};

export default Page;
