import { MicroCMSQueries } from "microcms-js-sdk";
import { TagResponse } from "../../api-client";
import { formatMicroCMSContent } from "../utils/microCMS";

const testdata: TagResponse[] = [
  {
    id: "1",
    name: "tag1",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    revisedAt: "",
  },
  {
    id: "2",
    name: "tag2",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    revisedAt: "",
  },
  {
    id: "3",
    name: "tag3",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    revisedAt: "",
  },
];

export const mockGetTagList = (queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  });
};

export const mockGetTag = (id: string, queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    id: id ? id : undefined,
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  })[0];
};
