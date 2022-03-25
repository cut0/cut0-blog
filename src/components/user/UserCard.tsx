import { VFC } from "react";
import Image from "next/image";
import { UserResponse } from "../../../api-client";
import {
  Content,
  EyecatchContainer,
  UserEyecatch,
  UserInfo,
  UserName,
  UserDescription,
} from "./UserCard.css";

type UserCardProps = {
  user: UserResponse;
};

export const UserCard: VFC<UserCardProps> = ({ user }) => {
  return (
    <div className={Content}>
      <div className={EyecatchContainer}>
        <Image
          alt="筆者のアイコン"
          className={UserEyecatch}
          height={user.eyecatch.height}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          src={user.eyecatch.url}
          width={user.eyecatch.width}
        />
      </div>
      <div className={UserInfo}>
        <span className={UserName}>{user.name}</span>
        <p className={UserDescription}>
          CEO of Crescware Inc.
          音楽を聴く人、弾く人、作る人をWebで豊かにする会社 /
          Webで音楽活動する方をもっと充実させるためのサービスを開発中 /
          音楽学校講師→作編曲家→Webデベロッパー→創業
        </p>
      </div>
    </div>
  );
};
