import { client } from "../plugins/client";
import type {
  MicroCmsContent,
  MicroCmsGetListModel,
  MicroCmsGetModel,
} from "../types";

export type TagResponse = MicroCmsContent<{
  name: string;
  isPublic: boolean;
}>;

export const getTagList: MicroCmsGetListModel<TagResponse[]> = {
  key: `${import.meta.env.PUBLIC_END_POINT}/getTagList`,
  handler: async (queries) => {
    const data = await client().getList<TagResponse>({
      endpoint: "tags",
      queries,
    });
    return data.contents;
  },
};

export const getTag: MicroCmsGetModel<TagResponse> = {
  key: `${import.meta.env.PUBLIC_END_POINT}/getTag`,
  handler: async (id, queries) => {
    const data = await client().get<TagResponse>({
      endpoint: "tags",
      contentId: id,
      queries,
    });
    return data;
  },
};
