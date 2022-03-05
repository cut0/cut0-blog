import { client } from "../plugins/client";

export const getUserList = async () => {
  const data = await client.getList<User>({ endpoint: "users" });
  return data.contents;
};

export const getUser = async () => {
  const data = await client.get<User>({ endpoint: "users" });
  return data;
};
