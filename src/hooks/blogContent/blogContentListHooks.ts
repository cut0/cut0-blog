import useSWRInfinite from "swr/infinite";
import { BlogContentResponse, getBlogContentList } from "../../../api-client";

const LIMIT = 20;

const getKey = (
  pageIndex: number,
  previousPageData: BlogContentResponse[],
): [string, number, number] | null => {
  if (previousPageData && !previousPageData.length) return null;
  return [getBlogContentList.key, pageIndex, LIMIT];
};

const fetcher = (_: string, pageIndex: number, limit: number) => {
  return getBlogContentList.handler({
    offset: pageIndex * LIMIT,
    limit,
  });
};

export const useBlogContentListInfinite = (
  initialData: BlogContentResponse[],
) => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    fallback: initialData,
  });

  const isLast = data
    ? data.filter((list) => list.length < LIMIT).length > 0
    : false;

  return {
    blogContentList: data?.flat(),
    blogContentListSize: size,
    fetchBlogContentList: () => {
      if (!isLast) return setSize((pre) => pre + 1);
    },
    isLast,
    error,
    loading: !data && !error,
  };
};
