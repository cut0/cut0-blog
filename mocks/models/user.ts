import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import { getUser, getUserList, UserResponse } from "../../api-client";
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

const mockGetUserList: ResponseResolver<MockedRequest, typeof restContext> = (
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

const mockGetUser: ResponseResolver<MockedRequest, typeof restContext> = (
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

export const userHandlers = [
  rest.get(getUserList.key, mockGetUserList),
  rest.get(getUser.key, mockGetUser),
];
