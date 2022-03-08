import { off } from "process";
import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import {
  getBlogContent,
  getBlogContentList,
  BlogContentResponse,
} from "../../api-client";
import { formatMicroCMSContent } from "../utils/microCMS";

const testdata: BlogContentResponse[] = [
  {
    id: "1",
    description:
      "descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
    title:
      "titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle",
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
        eyecatch: "",
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
  },
];

const mockGetBlogContentList: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const offset = req.url.searchParams.get("offset");
  const limit = req.url.searchParams.get("limit");

  return res(
    ctx.status(200),
    ctx.json(
      formatMicroCMSContent(testdata, {
        offset: offset ? Number(offset) : undefined,
        limit: limit ? Number(limit) : undefined,
      }),
    ),
  );
};

const mockGetBlogContent: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const id = req.url.searchParams.get("id");
  const offset = req.url.searchParams.get("offset");
  const limit = req.url.searchParams.get("limit");

  return res(
    ctx.status(200),
    ctx.json(
      formatMicroCMSContent(testdata, {
        id: id ? id : undefined,
        offset: offset ? Number(offset) : undefined,
        limit: limit ? Number(limit) : undefined,
      }),
    ),
  );
};

export const blogContentHandlers = [
  rest.get(getBlogContentList.key, mockGetBlogContentList),
  rest.get(getBlogContent.key, mockGetBlogContent),
];
