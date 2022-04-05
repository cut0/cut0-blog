import { act, renderHook } from "@testing-library/react-hooks";
import { getArticleList } from "../../../api-client";
import { mockGetArticleList } from "../../../mocks";
import { SwrTestWrapper } from "../../components/SwrTestWrapper";
import { useArticleListInfinite } from "./articleListInfiniteHooks";

const mock = jest.spyOn(getArticleList, "handler");

beforeEach(() => {
  mock.mockImplementation((x) => {
    return Promise.resolve(mockGetArticleList(x));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("初期状態", async () => {
  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  expect(result.current).toEqual({
    articleList: undefined,
    articleListSize: 1,
    fetchArticleList: expect.any(Function),
    isLast: false,
    error: undefined,
    loading: true,
  });

  await act(async () => {
    await Promise.all(mock.mock.instances);
  });
});

test("初回レンダリング時", async () => {
  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {
    await Promise.all(mock.mock.instances);
  });

  expect(result.current).toEqual({
    articleList: mockGetArticleList({ offset: 0, limit: 10 }),
    articleListSize: 1,
    fetchArticleList: expect.any(Function),
    isLast: false,
    error: undefined,
    loading: false,
  });
});

test("取得成功時", async () => {
  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {
    await result.current.fetchArticleList();
    await result.current.fetchArticleList();
    await Promise.all(mock.mock.instances);
  });

  expect(result.current).toEqual({
    articleList: mockGetArticleList({ offset: 0, limit: 30 }),
    articleListSize: 3,
    fetchArticleList: expect.any(Function),
    isLast: false,
    error: undefined,
    loading: false,
  });
});

test("取得失敗時", async () => {
  mock.mockRejectedValue(new Error());

  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {
    await result.current.fetchArticleList();
    await Promise.all(mock.mock.instances);
  });

  expect(result.current).toEqual({
    articleList: undefined,
    articleListSize: 2,
    fetchArticleList: expect.any(Function),
    isLast: false,
    error: new Error(),
    loading: false,
  });
});
