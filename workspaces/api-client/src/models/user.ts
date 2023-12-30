import { client } from "../plugins/client";
import type { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import type { UserResponse } from "./types";

const GET_USER_LIST_KEY = `${import.meta.env.PUBLIC_END_POINT}/getUserList`;

export const getUserList: MicroCMSGETListModel<UserResponse[]> = {
  key: GET_USER_LIST_KEY,
  handler: async (queries) => {
    const data = await client().getList<UserResponse>({
      endpoint: "users",
      queries,
    });
    return data.contents;
  },
};

const GET_USER_KEY = `${import.meta.env.PUBLIC_END_POINT}/getUser`;

export const getUser: MicroCMSGETModel<UserResponse> = {
  key: GET_USER_KEY,
  handler: async (id, queries) => {
    const data = await client().get<UserResponse>({
      endpoint: "users",
      contentId: id,
      queries,
    });
    return data;
  },
};
