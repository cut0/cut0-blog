import type { NextPage, GetStaticPropsResult } from "next";
import {
  ArticleResponse,
  getArticle,
  getArticleList,
} from "../../../api-client";
import { ArticleContent } from "../../components/content/articles/[articleId]";

type ArticleProps = {
  article: ArticleResponse;
};

export const getStaticPaths = async () => {
  const articleList = await getArticleList.handler({});
  return {
    paths: articleList.map((article) => `/articles/${article.id}`),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { articleId: string };
}): Promise<GetStaticPropsResult<ArticleProps>> => {
  const article = await getArticle.handler(params.articleId, {});
  return {
    props: {
      article,
    },
  };
};

const Article: NextPage<ArticleProps> = ({ article }) => {
  return (
    <>
      <ArticleContent article={article}></ArticleContent>
    </>
  );
};

export default Article;
