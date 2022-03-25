import useSWR from "swr";
import { ArticleResponse, getArticleList } from "../../../api-client";

type FilterOptions = {
  category: "recently" | "pick-up";
  tagId?: string;
};

const getKey = ({ category, tagId }: FilterOptions) => {
  return {
    key: getArticleList.key,
    category,
    tagId,
  };
};

const fetcher = ({ category, tagId }: ReturnType<typeof getKey>) => {
  const filterStrList: string[] = [];
  if (category === "pick-up") {
    filterStrList.push("(isPicked[equals]true)");
  }
  if (tagId) {
    filterStrList.push(`(tags[contains]${tagId})`);
  }
  if (process.env.NODE_ENV === "production") {
    filterStrList.push("(isPublic[equals]true)");
  }
  if (filterStrList.length > 0) {
    return getArticleList.handler({
      filters: filterStrList.join("[and]"),
    });
  }
  return getArticleList.handler({});
};

export const useArticleList = (
  filterOptions: FilterOptions,
  initialData?: ArticleResponse[],
) => {
  const { data, error } = useSWR<ArticleResponse[], Error>(
    getKey(filterOptions),
    fetcher,
    { fallbackData: initialData },
  );

  return {
    articleList: data,
    error,
    loading: !data && !error,
  };
};
