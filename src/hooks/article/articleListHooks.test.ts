import { act, renderHook } from "@testing-library/react-hooks";
import { getArticleList } from "../../../api-client";
import { mockGetArticleList } from "../../../mocks";
import { SwrTestWrapper } from "../../components/SwrTestWrapper";
import { useArticleListInfinite } from "./articleListHooks";

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
});

test("初回レンダリング時", async () => {
  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {});

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
  const mock = jest
    .spyOn(getArticleList, "handler")
    .mockRejectedValue(new Error());

  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {
    await result.current.fetchArticleList();
  });

  expect(result.current).toEqual({
    articleList: undefined,
    articleListSize: 2,
    fetchArticleList: expect.any(Function),
    isLast: false,
    error: new Error(),
    loading: false,
  });

  mock.mockRestore();
});

test("エラー発生後のデータ整合性", async () => {
  const mock = jest
    .spyOn(getArticleList, "handler")
    .mockRejectedValueOnce(new Error());

  const { result } = renderHook(
    () => useArticleListInfinite({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {
    await result.current.fetchArticleList();
  });

  expect(result.current).toEqual({
    articleList: mockGetArticleList({ offset: 0, limit: 20 }),
    articleListSize: 2,
    fetchArticleList: expect.any(Function),
    isLast: false,
    error: new Error(),
    loading: false,
  });

  mock.mockRestore();
});
