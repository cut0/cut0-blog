import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserResponse } from "../../../api-client";

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
import { TwitterSvgIcon } from "../icons/TwitterSvgIcon";
import { GitHubSvgIcon } from "../icons/GitHubSvgIcon";

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
            <GitHubSvgIcon title="GitHub" className={UserSNSIcon} />
            <span>{user.github}</span>
          </a>
        </Link>
        <Link href={`https://twitter.com/${user.twitter}`}>
          <a className={UserSNS} target="_blank">
            <TwitterSvgIcon title="Twitter" className={UserSNSIcon} />
            <span>{user.twitter}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
