import { act, renderHook } from "@testing-library/react-hooks";
import { getBlogContentList } from "../../../api-client";
import { mockGetBlogContentList } from "../../../mocks";
import { SwrTestWrapper } from "../../components/SwrTestWrapper";
import { useBlogContentListInfinite } from "./blogContentListHooks";

test("初期状態", async () => {
  const { result } = renderHook(() => useBlogContentListInfinite([]), {
    wrapper: SwrTestWrapper,
  });

  expect(result.current).toEqual({
    blogContentList: undefined,
    blogContentListSize: 1,
    fetchBlogContentList: expect.any(Function),
    isLast: false,
    error: undefined,
    loading: true,
  });
});

test("初回レンダリング時", async () => {
  const { result } = renderHook(() => useBlogContentListInfinite([]), {
    wrapper: SwrTestWrapper,
  });

  await act(async () => {});

  expect(result.current).toEqual({
    blogContentList: mockGetBlogContentList({ offset: 0, limit: 20 }),
    blogContentListSize: 1,
    fetchBlogContentList: expect.any(Function),
    isLast: false,
    error: undefined,
    loading: false,
  });
});

test("取得成功時", async () => {
  const { result } = renderHook(() => useBlogContentListInfinite([]), {
    wrapper: SwrTestWrapper,
  });

  await act(async () => {
    await result.current.fetchBlogContentList();
    await result.current.fetchBlogContentList();
  });

  expect(result.current).toEqual({
    blogContentList: mockGetBlogContentList({ offset: 0, limit: 60 }),
    blogContentListSize: 3,
    fetchBlogContentList: expect.any(Function),
    isLast: false,
    error: undefined,
    loading: false,
  });
});

test("取得失敗時", async () => {
  const mock = jest
    .spyOn(getBlogContentList, "handler")
    .mockRejectedValue(new Error());

  const { result } = renderHook(() => useBlogContentListInfinite([]), {
    wrapper: SwrTestWrapper,
  });

  await act(async () => {
    await result.current.fetchBlogContentList();
  });

  expect(result.current).toEqual({
    blogContentList: undefined,
    blogContentListSize: 2,
    fetchBlogContentList: expect.any(Function),
    isLast: false,
    error: new Error(),
    loading: false,
  });

  mock.mockRestore();
});

test("エラー発生後のデータ整合性", async () => {
  const mock = jest
    .spyOn(getBlogContentList, "handler")
    .mockRejectedValueOnce(new Error());

  const { result } = renderHook(() => useBlogContentListInfinite([]), {
    wrapper: SwrTestWrapper,
  });

  await act(async () => {
    await result.current.fetchBlogContentList();
  });

  console.log(result.current.error);

  expect(result.current).toEqual({
    blogContentList: mockGetBlogContentList({ offset: 0, limit: 40 }),
    blogContentListSize: 2,
    fetchBlogContentList: expect.any(Function),
    isLast: false,
    error: new Error(),
    loading: false,
  });

  mock.mockRestore();
});
