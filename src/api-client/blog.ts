import { client } from "../plugins/client";

export const getBlogContentList = async () => {
  const data = await client.getList<BlogContent>({ endpoint: "blogs" });
  return data.contents;
};

export const getBlogContent = async () => {
  const data = await client.get<BlogContent>({ endpoint: "blogs" });
  return data;
};
