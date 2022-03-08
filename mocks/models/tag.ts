import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import { getTag, getTagList, TagResponse } from "../../api-client";
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

const mockGetTagList: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
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

const mockGetTag: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
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

export const tagHandlers = [
  rest.get(getTagList.key, mockGetTagList),
  rest.get(getTag.key, mockGetTag),
];
