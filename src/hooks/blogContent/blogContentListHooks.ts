import useSWR from "swr";
import { BlogContentResponse, getBlogContentList } from "../../../api-client";

export const useBlogContentList = (initialData: BlogContentResponse[]) => {
  const { key, handler } = getBlogContentList;
  const { data, error, mutate } = useSWR(
    key,
    handler.bind(undefined, { offset: 0, limit: 20 }),
    {
      fallbackData: initialData,
    },
  );

  return {
    data,
    error,
    loading: !data && !error,
    fetchBlogContentList: mutate,
  };
};
