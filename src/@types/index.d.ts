type MicroCMSDefalut = import("microcms-js-sdk").MicroCMSContentId &
  import("microcms-js-sdk").MicroCMSDate;

type BlogContent = {
  description: string;
  title: string;
  tags: Tag[];
  users: User[];
} & MicroCMSDefalut;

type Tag = {
  name: string;
} & MicroCMSDefalut;

type User = {
  name: string;
  eyecatch: string;
} & MicroCMSDefalut;
