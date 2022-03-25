import { client } from "../plugins/client";
import { MicroCMSGETListModel, MicroCMSGETModel } from "../types";
import { UserResponse } from "./types";

const GET_USER_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getUserList`;

export const getUserList: MicroCMSGETListModel<UserResponse[]> = {
  key: GET_USER_LIST_KEY,
  handler: async (queries) => {
    const data = await client.getList<UserResponse>({
      endpoint: "users",
      queries,
    });
    return data.contents;
  },
};

const GET_USER_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getUser`;

export const getUser: MicroCMSGETModel<UserResponse> = {
  key: GET_USER_KEY,
  handler: async (id, queries) => {
    const data = await client.get<UserResponse>({
      endpoint: "users",
      contentId: id,
      queries,
    });
    return data;
  },
};
