import { client } from "../plugins/client";
import { BlogContentResponse } from "../types";

export const getBlogContentList = async () => {
  const data = await client.getList<BlogContentResponse>({ endpoint: "blogs" });
  return data.contents;
};

export const getBlogContent = async () => {
  const data = await client.get<BlogContentResponse>({ endpoint: "blogs" });
  return data;
};
