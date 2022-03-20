import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

type MicroCMSDefalut = MicroCMSContentId & MicroCMSDate;

type Image = {
  url: string;
  height: number;
  width: number;
};

export type BlogContentResponse = {
  description: string;
  title: string;
  tags: TagResponse[];
  users: UserResponse[];
  eyecatch: Image;
} & MicroCMSDefalut;

export type TagResponse = {
  name: string;
} & MicroCMSDefalut;

export type UserResponse = {
  name: string;
  eyecatch: Image;
} & MicroCMSDefalut;
