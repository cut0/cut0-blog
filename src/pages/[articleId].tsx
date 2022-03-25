import type { NextPage, GetStaticPropsResult } from "next";
import markdownToHtml from "zenn-markdown-html";
import { ArticleResponse, getArticle, getArticleList } from "../../api-client";
import { ArticleContent } from "../components/content/articles/ArticleContent";
import { createArticleFilter } from "../modules/articleFilter";

type ArticleProps = {
  article: ArticleResponse;
};

export const getStaticPaths = async () => {
  const articleList = await getArticleList.handler({
    filters: createArticleFilter({ category: "recently" }),
  });
  return {
    paths: articleList.map((article) => `/${article.id}`),
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
      article: { ...article, body: markdownToHtml(article.body) },
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
