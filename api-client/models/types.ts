import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

type MicroCMSDefalut = MicroCMSContentId & MicroCMSDate;

type Image = {
  url: string;
  height: number;
  width: number;
};

export type ArticleResponse = {
  description: string;
  title: string;
  body: string;
  tags: TagResponse[];
  users: UserResponse[];
  eyecatch: Image;
  isPicked: boolean;
  isPublic: boolean;
} & MicroCMSDefalut;

export type TagResponse = {
  name: string;
  isPublic: boolean;
} & MicroCMSDefalut;

export type UserResponse = {
  name: string;
  eyecatch: Image;
  description: string;
  github: string;
  twitter: string;
} & MicroCMSDefalut;
