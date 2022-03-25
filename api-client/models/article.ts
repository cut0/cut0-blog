import { client } from "../plugins/client";
import { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import { ArticleResponse } from "./types";

const GET_BLOG_CONTENT_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getArticleList`;

export const getArticleList: MicroCMSGETListModel<ArticleResponse[]> = {
  key: GET_BLOG_CONTENT_LIST_KEY,
  handler: async (queries) => {
    const data = await client.getList<ArticleResponse>({
      endpoint: "blog-contents",
      queries,
    });
    return data.contents;
  },
};

const GET_BLOG_CONTENT_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getArticle`;

export const getArticle: MicroCMSGETModel<ArticleResponse> = {
  key: GET_BLOG_CONTENT_KEY,
  handler: async (id, queries) => {
    const data = await client.get<ArticleResponse>({
      endpoint: "blog-contents",
      contentId: id,
      queries,
    });
    return data;
  },
};
