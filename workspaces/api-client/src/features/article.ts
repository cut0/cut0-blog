import { client } from "../plugins/client";
import type {
  MicroCmsContent,
  MicroCmsGetListModel,
  MicroCmsGetModel,
  MircoCmsImage,
} from "../types";
import { TagResponse } from "./tag";
import { UserResponse } from "./user";

type ArticleResponse = MicroCmsContent<{
  description: string;
  title: string;
  body: string;
  tags: TagResponse[];
  users: UserResponse[];
  eyecatch: MircoCmsImage;
  isPicked: boolean;
  isPublic: boolean;
}>;

export const getArticleList: MicroCmsGetListModel<ArticleResponse[]> = {
  key: `${import.meta.env.PUBLIC_END_POINT}/getArticleList`,
  handler: async (queries) => {
    const data = await client().getList<ArticleResponse>({
      endpoint: "blog-contents",
      queries,
    });
    return data.contents;
  },
};

export const getArticle: MicroCmsGetModel<ArticleResponse> = {
  key: `${import.meta.env.PUBLIC_END_POINT}/getArticle`,
  handler: async (id, queries) => {
    const data = await client().get<ArticleResponse>({
      endpoint: "blog-contents",
      contentId: id,
      queries,
    });
    return data;
  },
};
