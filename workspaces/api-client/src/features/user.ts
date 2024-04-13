import { client } from "../plugins/client";
import type {
  MicroCmsContent,
  MicroCmsGetListModel,
  MicroCmsGetModel,
  MircoCmsImage,
} from "../types";

export type UserResponse = MicroCmsContent<{
  name: string;
  eyecatch: MircoCmsImage;
  description: string;
  github: string;
  twitter: string;
}>;

export const getUserList: MicroCmsGetListModel<UserResponse[]> = {
  key: `${import.meta.env.PUBLIC_END_POINT}/getUserList`,
  handler: async (queries) => {
    const data = await client().getList<UserResponse>({
      endpoint: "users",
      queries,
    });
    return data.contents;
  },
};

export const getUser: MicroCmsGetModel<UserResponse> = {
  key: `${import.meta.env.PUBLIC_END_POINT}/getUser`,
  handler: async (id, queries) => {
    const data = await client().get<UserResponse>({
      endpoint: "users",
      contentId: id,
      queries,
    });
    return data;
  },
};
