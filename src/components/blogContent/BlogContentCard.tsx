import { VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BlogContentResponse } from "../../../api-client";
import Bookmark from "../../../assets/bookmark.svg";
import { formatDate } from "../../utils/date";
import {
  Card,
  BlogContentBookmarkContainer,
  BlogContentEyecatchContainer,
  BlogContentEyecatch,
  BlogContentInfoContainer,
  BlogContentTitle,
  BlogContentTagsContainer,
  BlogContentTag,
  UserInfoContainer,
  UserInfo,
  UserEyecatch,
  UserName,
  PublishedAt,
} from "./BlogContentCard.css";

type BlogContentCardProps = {
  blogContent: BlogContentResponse;
};

export const BlogContentCard: VFC<BlogContentCardProps> = ({ blogContent }) => {
  return (
    <Link href={{ pathname: "/[id]", query: { id: blogContent.id } }} passHref>
      <article className={Card}>
        <div className={BlogContentBookmarkContainer}>
          <Bookmark />
        </div>
        <div className={BlogContentEyecatchContainer}>
          <Image
            alt="ブログの画像"
            className={BlogContentEyecatch}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            src={blogContent.eyecatch.url}
          />
        </div>
        <div className={BlogContentInfoContainer}>
          <p className={BlogContentTitle}>{blogContent.title}</p>
          <div className={BlogContentTagsContainer}>
            {blogContent.tags.map((tag, index) => {
              return (
                <span className={BlogContentTag} key={index}>
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
              src={blogContent.users[0].eyecatch.url}
              width="36px"
            />
            <div className={UserInfo}>
              <span className={UserName}>{blogContent.users[0].name}</span>
              <span className={PublishedAt}>
                {formatDate(blogContent.users[0].publishedAt)}投稿
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
