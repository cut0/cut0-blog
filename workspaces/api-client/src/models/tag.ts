import { client } from "../plugins/client";
import type { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import type { TagResponse } from "./types";

const GET_TAG_LIST_KEY = `${import.meta.env.PUBLIC_END_POINT}/getTagList`;

export const getTagList: MicroCMSGETListModel<TagResponse[]> = {
  key: GET_TAG_LIST_KEY,
  handler: async (queries) => {
    const data = await client().getList<TagResponse>({
      endpoint: "tags",
      queries,
    });
    return data.contents;
  },
};

const GET_TAG_KEY = `${import.meta.env.PUBLIC_END_POINT}/getTag`;

export const getTag: MicroCMSGETModel<TagResponse> = {
  key: GET_TAG_KEY,
  handler: async (id, queries) => {
    const data = await client().get<TagResponse>({
      endpoint: "tags",
      contentId: id,
      queries,
    });
    return data;
  },
};
