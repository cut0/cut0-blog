import { VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArticleResponse } from "../../../api-client";
import Bookmark from "../../../assets/bookmark.svg";
import { formatDate } from "../../utils/date";
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
  UserEyecatch,
  UserName,
  PublishedAt,
} from "./ArticleCard.css";

type ArticleCardProps = {
  article: ArticleResponse;
};

export const ArticleCard: VFC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={{ pathname: "/[id]", query: { id: article.id } }} passHref>
      <article className={Card}>
        <div className={ArticleBookmarkContainer}>
          <Bookmark />
        </div>
        <div className={ArticleEyecatchContainer}>
          <Image
            alt="ブログの画像"
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
            <Image
              alt="筆者のアイコン"
              className={UserEyecatch}
              height="36px"
              loading="lazy"
              src={article.users[0].eyecatch.url}
              width="36px"
            />
            <div className={UserInfo}>
              <span className={UserName}>{article.users[0].name}</span>
              <span className={PublishedAt}>
                {formatDate(article.users[0].publishedAt)}投稿
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
