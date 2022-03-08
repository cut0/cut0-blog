import { client } from "../plugins/client";
import { Model } from "../types";
import { TagResponse } from "./types";

const GET_TAG_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getTagList`;

export const getTagList: Model<TagResponse[]> = {
  key: GET_TAG_LIST_KEY,
  handler: async () => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(GET_TAG_LIST_KEY).then((res) => res.json());
      return data as TagResponse[];
    }
    const data = await client.getList<TagResponse>({ endpoint: "tags" });
    return data.contents;
  },
};

const GET_TAG_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getTag`;

export const getTag: Model<TagResponse> = {
  key: GET_TAG_KEY,
  handler: async () => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(GET_TAG_KEY).then((res) => res.json());
      return data as TagResponse;
    }
    const data = await client.get<TagResponse>({ endpoint: "tags" });
    return data;
  },
};
