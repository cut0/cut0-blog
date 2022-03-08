import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import { getTag, getTagList, TagResponse } from "../../api-client";

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
  _,
  res,
  ctx,
) => {
  return res(ctx.status(200), ctx.json(testdata));
};

const mockGetTag: ResponseResolver<MockedRequest, typeof restContext> = (
  _,
  res,
  ctx,
) => {
  return res(ctx.status(200), ctx.json(testdata[0]));
};

export const tagHandlers = [
  rest.get(getTagList.key, mockGetTagList),
  rest.get(getTag.key, mockGetTag),
];
