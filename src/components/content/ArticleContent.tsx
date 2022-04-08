import "zenn-content-css";
import { VFC } from "react";
import { ArticleResponse } from "../../../api-client";
import { formatDate } from "../../utils/date";
import { UserCard } from "../user/UserCard";
import { SeoLayout } from "../layout/Seo";
import {
  ArticleWrapper,
  ArticleContainer,
  Article,
  ArticleTitleContainer,
  ArticlePublishedAt,
  ArticleUserContainer,
} from "./ArticleContent.css";

type ArticleContentProps = {
  article: ArticleResponse;
};

export const ArticleContent: VFC<ArticleContentProps> = ({ article }) => {
  return (
    <SeoLayout
      ogp={{
        pageTitle: article.title,
        pageDescription: article.description,
        pageImg: article.eyecatch.url,
        pageImgWidth: article.eyecatch.width,
        pageImgHeight: article.eyecatch.height,
        pageType: "article",
      }}
      twitter={{ card: "summary_large_image" }}
    >
      <div className={ArticleWrapper}>
        <section className={ArticleContainer}>
          <h2 className={ArticleTitleContainer}>
            <span>{article.title}</span>
          </h2>
          <span className={ArticlePublishedAt}>
            {formatDate(article.publishedAt)}投稿
          </span>
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
    </SeoLayout>
  );
};
