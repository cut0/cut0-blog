import "zenn-content-css";
import { VFC } from "react";
import { ArticleResponse } from "../../../../api-client";
import { formatDate } from "../../../utils/date";
import {
  ArticleWrapper,
  ArticleContainer,
  ArticleTitle,
  Article,
} from "./[articleId].css";

type ArticleContentProps = {
  article: ArticleResponse;
};

export const ArticleContent: VFC<ArticleContentProps> = ({ article }) => {
  return (
    <div className={ArticleWrapper}>
      <section className={ArticleContainer}>
        <h2 className={ArticleTitle}>{article.title}</h2>
        <span>{formatDate(article.publishedAt)}投稿</span>
        <article
          className={`znc ${Article}`}
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></article>
      </section>
      <section></section>
    </div>
  );
};
