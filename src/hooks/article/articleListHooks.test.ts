import { act, renderHook } from "@testing-library/react-hooks";
import { getArticleList } from "../../../api-client";
import { mockGetArticleList } from "../../../mocks";
import { SwrTestWrapper } from "../../components/SwrTestWrapper";
import { useArticleList } from "./articleListHooks";

const mock = jest.spyOn(getArticleList, "handler");

describe(useArticleList.name, () => {
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

    await act(async () => {
      await Promise.all(mock.mock.instances);
    });
  });

  test("初回レンダリング時", async () => {
    const { result } = renderHook(
      () => useArticleList({ category: "recently" }),
      {
        wrapper: SwrTestWrapper,
      },
    );

    await act(async () => {
      await Promise.all(mock.mock.instances);
    });

    expect(result.current).toEqual({
      articleList: mockGetArticleList({}),
      error: undefined,
      loading: false,
    });
  });

  test("取得失敗時", async () => {
    mock.mockImplementation((x) => {
      return Promise.reject(new Error());
    });

    const { result } = renderHook(
      () => useArticleList({ category: "recently" }),
      {
        wrapper: SwrTestWrapper,
      },
    );

    await act(async () => {
      await Promise.all(mock.mock.instances);
    });

    expect(result.current).toEqual({
      articleList: undefined,
      error: new Error(),
      loading: false,
    });
  });
});
