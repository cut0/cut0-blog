import { client } from "../plugins/client";

export const getTagList = async () => {
  const data = await client.getList<Tag>({ endpoint: "tags" });
  return data.contents;
};

export const getTag = async () => {
  const data = await client.get<Tag>({ endpoint: "tags" });
  return data;
};
