import type { NextPage, GetStaticPropsResult } from "next";
import {
  ArticleResponse,
  getArticleList,
  getTagList,
  TagResponse,
} from "../../../api-client";
import { HomeContent } from "../../components/content/HomeContent";

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
  const fields = "description,title,tags,users,eyecatch,isPicked";
  const [articleList, tagList] = await Promise.all([
    getArticleList.handler({
      fields,
      filters: `(isPicked[equals]true)[and](tags[contains]${tagId})${
        process.env.NODE_ENV === "production"
          ? "[and](isPublic[equals]true)"
          : ""
      }`,
    }),
    getTagList.handler({
      filters:
        process.env.NODE_ENV === "production"
          ? "(isPublic[equals]true)"
          : undefined,
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
    <>
      <HomeContent
        baseArticleList={articleList}
        category="pick-up"
        tagId={tagId}
        tagList={tagList}
      />
    </>
  );
};

export default Page;
