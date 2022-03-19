import { MicroCMSQueries } from "microcms-js-sdk";
import { UserResponse } from "../../api-client";
import { formatMicroCMSContent } from "../utils/microCMS";

const testdata: UserResponse[] = [
  {
    id: "1",
    name: "user name",
    eyecatch: "",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    revisedAt: "",
  },
];

export const mockGetUserList = (queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  });
};

export const mockGetUser = (id: string, queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    id: id ? id : undefined,
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  })[0];
};
