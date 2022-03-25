import type { NextPage, GetStaticPropsResult } from "next";
import {
  ArticleResponse,
  getArticleList,
  getTagList,
  TagResponse,
} from "../../../api-client";
import { HomeContent } from "../../components/content/HomeContent";

type HomeProps = {
  tagList: TagResponse[];
  articleList: ArticleResponse[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const fields = "description,title,tags,users,eyecatch,isPicked";
  const [articleList, tagList] = await Promise.all([
    getArticleList.handler({
      fields,
      filters: "(isPicked[equals]true)",
    }),
    getTagList.handler({}),
  ]);

  return {
    props: { articleList, tagList },
  };
};

const Page: NextPage<HomeProps> = ({ articleList, tagList }) => {
  return (
    <>
      <HomeContent
        baseArticleList={articleList}
        category="pick-up"
        tagList={tagList}
      />
    </>
  );
};

export default Page;