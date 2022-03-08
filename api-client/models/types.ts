import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

type MicroCMSDefalut = MicroCMSContentId & MicroCMSDate;

export type BlogContentResponse = {
  description: string;
  title: string;
  tags: TagResponse[];
  users: UserResponse[];
} & MicroCMSDefalut;

export type TagResponse = {
  name: string;
} & MicroCMSDefalut;

export type UserResponse = {
  name: string;
  eyecatch: string;
} & MicroCMSDefalut;
