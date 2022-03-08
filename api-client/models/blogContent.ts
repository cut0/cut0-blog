import { client } from "../plugins/client";
import { Model } from "../types";
import { BlogContentResponse } from "./types";

const GET_BLOG_CONTENT_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getBlogContentList`;

export const getBlogContentList: Model<BlogContentResponse[]> = {
  key: GET_BLOG_CONTENT_LIST_KEY,
  handler: async () => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(GET_BLOG_CONTENT_LIST_KEY).then((res) =>
        res.json(),
      );
      return data as BlogContentResponse[];
    }
    const data = await client.getList<BlogContentResponse>({
      endpoint: "blogs",
    });
    return data.contents;
  },
};

const GET_BLOG_CONTENT_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getBlogContent`;

export const getBlogContent: Model<BlogContentResponse> = {
  key: GET_BLOG_CONTENT_KEY,
  handler: async () => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch("getBlogContent").then((res) => res.json());
      return data as BlogContentResponse;
    }
    const data = await client.get<BlogContentResponse>({ endpoint: "blogs" });
    return data;
  },
};
