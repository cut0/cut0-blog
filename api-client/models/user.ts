import { client } from "../plugins/client";
import { Model } from "../types";
import { UserResponse } from "./types";

const GET_USER_LIST_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getUserList`;

export const getUserList: Model<UserResponse[]> = {
  key: GET_USER_LIST_KEY,
  handler: async () => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(GET_USER_LIST_KEY).then((res) => res.json());
      return data as UserResponse[];
    }
    const data = await client.getList<UserResponse>({ endpoint: "users" });
    return data.contents;
  },
};

const GET_USER_KEY = `${process.env.NEXT_PUBLIC_END_POINT}/getUser`;

export const getUser: Model<UserResponse> = {
  key: GET_USER_KEY,
  handler: async () => {
    if (process.env.NODE_ENV === "development") {
      const data = await fetch(GET_USER_KEY).then((res) => res.json());
      return data as UserResponse;
    }
    const data = await client.get<UserResponse>({ endpoint: "users" });
    return data;
  },
};
