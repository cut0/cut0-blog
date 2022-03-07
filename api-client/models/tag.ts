import { TagResponse } from "../types";
import { client } from "../plugins/client";

export const getTagList = async () => {
  const data = await client.getList<TagResponse>({ endpoint: "tags" });
  return data.contents;
};

export const getTag = async () => {
  const data = await client.get<TagResponse>({ endpoint: "tags" });
  return data;
};
