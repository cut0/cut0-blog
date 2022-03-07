import { UserResponse } from "../types";
import { client } from "../plugins/client";

export const getUserList = async () => {
  const data = await client.getList<UserResponse>({ endpoint: "users" });
  return data.contents;
};

export const getUser = async () => {
  const data = await client.get<UserResponse>({ endpoint: "users" });
  return data;
};
