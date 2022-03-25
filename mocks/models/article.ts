import { MicroCMSQueries } from "microcms-js-sdk";
import { ArticleResponse } from "../../api-client";
import { formatMicroCMSContent } from "../utils/microCMS";

const testdata: ArticleResponse[] = [...new Array(100)].map((_, index) => {
  return {
    id: String(index),
    body: "",
    description: `${index} descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription`,
    title: `${index} titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle`,
    tags: [
      {
        id: "1",
        name: "tag1",
        isPublic: true,
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        revisedAt: "",
      },
      {
        id: "2",
        name: "tag2",
        isPublic: true,
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        revisedAt: "",
      },
      {
        id: "3",
        name: "tag3",
        isPublic: true,
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
        description: "しがない学生エンジニアです",
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        revisedAt: "",
      },
    ],
    eyecatch: {
      url: "https://placehold.jp/150x150.png",
      height: 512,
      width: 512,
    },
    isPicked: true,
    isPublic: true,
    createdAt: "",
    updatedAt: "",
    publishedAt: "2022-12-26",
    revisedAt: "",
  };
});

export const mockGetArticleList = (queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  });
};

export const mockGetArticle = (id: string, queries: MicroCMSQueries) => {
  const { offset, limit } = queries;
  return formatMicroCMSContent(testdata, {
    id: id ? id : undefined,
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  })[0];
};
