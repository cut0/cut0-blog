import { rest, MockedRequest, ResponseResolver, restContext } from "msw";
import { getUser, getUserList, UserResponse } from "../../api-client";

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
  _,
  res,
  ctx,
) => {
  return res(ctx.status(200), ctx.json(testdata));
};

const mockGetUser: ResponseResolver<MockedRequest, typeof restContext> = (
  _,
  res,
  ctx,
) => {
  return res(ctx.status(200), ctx.json(testdata[0]));
};

export const userHandlers = [
  rest.get(getUserList.key, mockGetUserList),
  rest.get(getUser.key, mockGetUser),
];
