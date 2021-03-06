import { VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserResponse } from "../../../api-client";
import GitHub from "../../../assets/github.svg";
import Twitter from "../../../assets/twitter.svg";

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

export const UserCard: VFC<UserCardProps> = ({ user }) => {
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
            <GitHub className={UserSNSIcon} />
            <span>{user.github}</span>
          </a>
        </Link>
        <Link href={`https://twitter.com/${user.twitter}`}>
          <a className={UserSNS} target="_blank">
            <Twitter className={UserSNSIcon} />
            <span>{user.twitter}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
