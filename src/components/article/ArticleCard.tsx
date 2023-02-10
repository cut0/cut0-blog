import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleResponse } from "../../../api-client";
import { formatDate } from "../../utils/date";
import { articlePath } from "../../utils/pagePath";
import {
  Card,
  ArticleBookmarkContainer,
  ArticleEyecatchContainer,
  ArticleEyecatch,
  ArticleInfoContainer,
  ArticleTitle,
  ArticleTagsContainer,
  ArticleTag,
  UserInfoContainer,
  UserInfo,
  UserEyecatchContainer,
  UserEyecatch,
  UserName,
  PublishedAt,
} from "./ArticleCard.css";

type ArticleCardProps = {
  article: ArticleResponse;
};

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={articlePath({ articleId: article.id })} passHref>
      <a className={Card}>
        <div className={ArticleEyecatchContainer}>
          <Image
            alt={`${article.title} eyecatch`}
            className={ArticleEyecatch}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            src={article.eyecatch.url}
          />
        </div>
        <div className={ArticleInfoContainer}>
          <p className={ArticleTitle}>{article.title}</p>
          <div className={ArticleTagsContainer}>
            {article.tags.map((tag, index) => {
              return (
                <span className={ArticleTag} key={index}>
                  #{tag.name}
                </span>
              );
            })}
          </div>
          <div className={UserInfoContainer}>
            <div className={UserEyecatchContainer}>
              <Image
                alt={`${article.users[0].name} icon`}
                className={UserEyecatch}
                layout="fill"
                loading="lazy"
                objectFit="cover"
                src={article.users[0].eyecatch.url}
              />
            </div>
            <div className={UserInfo}>
              <span className={UserName}>{article.users[0].name}</span>
              <time className={PublishedAt}>
                {formatDate(article.publishedAt)}投稿
              </time>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
