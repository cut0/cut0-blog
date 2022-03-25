import { act, renderHook } from "@testing-library/react-hooks";
import { getArticleList } from "../../../api-client";
import { mockGetArticleList } from "../../../mocks";
import { SwrTestWrapper } from "../../components/SwrTestWrapper";
import { useArticleList } from "./articleListHooks";

test("初期状態", async () => {
  const mock = jest.spyOn(getArticleList, "handler").mockImplementation((x) => {
    return Promise.resolve(mockGetArticleList(x));
  });

  const { result } = renderHook(
    () => useArticleList({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  expect(result.current).toEqual({
    articleList: undefined,
    error: undefined,
    loading: true,
  });

  mock.mockRestore();
});

test("初回レンダリング時", async () => {
  const mock = jest.spyOn(getArticleList, "handler").mockImplementation((x) => {
    return Promise.resolve(mockGetArticleList(x));
  });

  const { result } = renderHook(
    () => useArticleList({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {});

  expect(result.current).toEqual({
    articleList: mockGetArticleList({}),
    error: undefined,
    loading: false,
  });

  mock.mockRestore();
});

test("取得失敗時", async () => {
  const mock = jest
    .spyOn(getArticleList, "handler")
    .mockRejectedValue(new Error());

  const { result } = renderHook(
    () => useArticleList({ category: "recently" }),
    {
      wrapper: SwrTestWrapper,
    },
  );

  await act(async () => {});

  expect(result.current).toEqual({
    articleList: undefined,
    error: new Error(),
    loading: false,
  });

  mock.mockRestore();
});
