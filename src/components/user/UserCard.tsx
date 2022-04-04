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
      </div>
    </div>
  );
};
