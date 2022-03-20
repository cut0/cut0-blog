import { MicroCMSQueries } from "microcms-js-sdk";
import { BlogContentResponse } from "../../api-client";
import { formatMicroCMSContent } from "../utils/microCMS";

const testdata: BlogContentResponse[] = [...new Array(100)].map((_, index) => {
  return {
    id: String(index),
    description: `${index} descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription`,
    title: `${index} titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle`,
    tags: [
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
    ],
    users: [
      {
        id: "1",
        name: "user name",
        eyecatch: {
          url: "https://placehold.jp/150x150.png",
          height: 512,
          width: 512,
        },
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        revisedAt: "",
      },
    ],
    createdAt: "",
    updatedAt: "",
    publishedAt: "2022-12-26",
    revisedAt: "",
    eyecatch: {
      url: "https://placehold.jp/150x150.png",
      height: 512,
      width: 512,
    },
  };
});

export const mockGetBlogContentList = (queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  });
};

export const mockGetBlogContent = (id: string, queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    id: id ? id : undefined,
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  })[0];
};
