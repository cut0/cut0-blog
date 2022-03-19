import { mockGetBlogContentList, mockGetBlogContent } from "../../mocks";
import { client } from "../plugins/client";
import { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import { BlogContentResponse } from "./types";

const GET_BLOG_CONTENT_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getBlogContentList`;

export const getBlogContentList: MicroCMSGETListModel<BlogContentResponse[]> = {
  key: GET_BLOG_CONTENT_LIST_KEY,
  handler: async (queries) => {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      return mockGetBlogContentList(queries);
    }
    const data = await client.getList<BlogContentResponse>({
      endpoint: "blogs",
      queries,
    });
    return data.contents;
  },
};

const GET_BLOG_CONTENT_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getBlogContent`;

export const getBlogContent: MicroCMSGETModel<BlogContentResponse> = {
  key: GET_BLOG_CONTENT_KEY,
  handler: async (id, queries) => {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      return mockGetBlogContent(id, queries);
    }
    const data = await client.get<BlogContentResponse>({
      endpoint: "blogs",
      contentId: id,
      queries,
    });
    return data;
  },
};
