import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserResponse } from "../../../api-client";

import { TwitterSvgIcon } from "../icons/TwitterSvgIcon";
import { GitHubSvgIcon } from "../icons/GitHubSvgIcon";
import { WebSvgIcon } from "../icons/WebSvgIcon";
import {
  Content,
  EyecatchContainer,
  UserEyecatch,
  UserInfo,
  UserName,
  UserDescription,
  UserSNS,
  UserSNSIcon,
} from "./UserCard.css";

type UserCardProps = {
  user: UserResponse;
};

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className={Content}>
      <div className={EyecatchContainer}>
        <Image
          alt={`${user.name} icon`}
          className={UserEyecatch}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          src={user.eyecatch.url}
        />
      </div>
      <div className={UserInfo}>
        <span className={UserName}>{user.name}</span>
        <p className={UserDescription}>{user.description}</p>
        <Link href={`https://github.com/${user.github}`}>
          <a className={UserSNS} target="_blank">
            <GitHubSvgIcon className={UserSNSIcon} title="GitHub" />
            <span>{user.github}</span>
          </a>
        </Link>
        <Link href={`https://twitter.com/${user.twitter}`}>
          <a className={UserSNS} target="_blank">
            <TwitterSvgIcon className={UserSNSIcon} title="Twitter" />
            <span>{user.twitter}</span>
          </a>
        </Link>
        <Link href={`https://cut0-portfolio.vercel.app`}>
          <a className={UserSNS} target="_blank">
            <WebSvgIcon className={UserSNSIcon} title="Web" width={24} />
            <span>Portfolio</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
