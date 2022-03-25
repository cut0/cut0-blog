import "zenn-content-css";
import { VFC } from "react";
import { ArticleResponse } from "../../../../api-client";
import { formatDate } from "../../../utils/date";
import { UserCard } from "../../user/UserCard";
import {
  ArticleWrapper,
  ArticleContainer,
  Article,
  ArticleTitle,
  ArticleBody,
  ArticleUserContainer,
} from "./ArticleContent.css";

type ArticleContentProps = {
  article: ArticleResponse;
};

export const ArticleContent: VFC<ArticleContentProps> = ({ article }) => {
  return (
    <div className={ArticleWrapper}>
      <section className={ArticleContainer}>
        <h2 className={ArticleTitle}>{article.title}</h2>
        <span>{formatDate(article.publishedAt)}投稿</span>
        <div className={Article}>
          <article
            className={"znc"}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <div className={ArticleUserContainer}>
            <UserCard user={article.users[0]} />
          </div>
        </div>
      </section>
    </div>
  );
};
