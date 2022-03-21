import useSWRInfinite from "swr/infinite";
import { BlogContentResponse, getBlogContentList } from "../../../api-client";

const LIMIT = 10;

type FilterOptions = {
  category: "recently" | "pick-up";
  tagId?: string;
};

const fetcher = (
  _: string,
  pageIndex: number,
  limit: number,
  { category, tagId }: FilterOptions,
) => {
  const defaultQueries = {
    offset: pageIndex * LIMIT,
    limit,
  };
  const filterStrList: string[] = [];
  if (category === "pick-up") {
    filterStrList.push("(isPicked[equals]true)");
  }
  if (tagId) {
    filterStrList.push(`(tags[contains]${tagId})`);
  }

  if (filterStrList.length > 0) {
    return getBlogContentList.handler({
      ...defaultQueries,
      filters: filterStrList.join("[and]"),
    });
  }
  return getBlogContentList.handler(defaultQueries);
};

const generateGetKey = ({ category, tagId }: FilterOptions) => {
  const getKey = (
    pageIndex: number,
    previousPageData: BlogContentResponse[],
  ): [string, number, number, FilterOptions] | null => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return [getBlogContentList.key, pageIndex, LIMIT, { category, tagId }];
  };
  return getKey;
};

export const useBlogContentListInfinite = (
  filterOptions: FilterOptions,
  initialData?: BlogContentResponse[],
) => {
  const getKey = generateGetKey(filterOptions);

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    fallbackData: initialData ? [initialData] : undefined,
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
