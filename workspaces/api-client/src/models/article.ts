import { client } from "../plugins/client";
import type { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import type { ArticleResponse } from "./types";

const GET_BLOG_CONTENT_LIST_KEY = `${
  import.meta.env.PUBLIC_END_POINT
}/getArticleList`;

export const getArticleList: MicroCMSGETListModel<ArticleResponse[]> = {
  key: GET_BLOG_CONTENT_LIST_KEY,
  handler: async (queries) => {
    const data = await client().getList<ArticleResponse>({
      endpoint: "blog-contents",
      queries,
    });
    return data.contents;
  },
};

const GET_BLOG_CONTENT_KEY = `${import.meta.env.PUBLIC_END_POINT}/getArticle`;

export const getArticle: MicroCMSGETModel<ArticleResponse> = {
  key: GET_BLOG_CONTENT_KEY,
  handler: async (id, queries) => {
    const data = await client().get<ArticleResponse>({
      endpoint: "blog-contents",
      contentId: id,
      queries,
    });
    return data;
  },
};

const GET_BLOG_CONTENT_MARKED_LIST_KEY = `${
  import.meta.env.PUBLIC_END_POINT
}/getMarkedArticleList`;

export const getMarkedArticleList: MicroCMSGETListModel<ArticleResponse[]> = {
  key: GET_BLOG_CONTENT_MARKED_LIST_KEY,
  handler: async () => {
    //ts-ignore
    const data = (await import("../out.json")).data as ArticleResponse[];
    return data;
  },
};
