import { client } from "../plugins/client";
import { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import { formatQueries } from "../utils/query";
import { TagResponse } from "./types";

const GET_TAG_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getTagList`;

export const getTagList: MicroCMSGETListModel<TagResponse[]> = {
  key: GET_TAG_LIST_KEY,
  handler: async (queries) => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(
        `${GET_TAG_LIST_KEY}?${formatQueries(queries)}`,
      ).then((res) => res.json());
      return data as TagResponse[];
    }
    const data = await client.getList<TagResponse>({
      endpoint: "tags",
      queries,
    });
    return data.contents;
  },
};

const GET_TAG_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getTag`;

export const getTag: MicroCMSGETModel<TagResponse> = {
  key: GET_TAG_KEY,
  handler: async (id, queries) => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(
        `${GET_TAG_KEY}?${formatQueries({ id, ...queries })}`,
      ).then((res) => res.json());
      return data as TagResponse;
    }
    const data = await client.get<TagResponse>({
      endpoint: "tags",
      contentId: id,
      queries,
    });
    return data;
  },
};
