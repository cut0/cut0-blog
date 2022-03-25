import useSWR from "swr";
import { ArticleResponse, getArticleList } from "../../../api-client";
import { createArticleFilter } from "../../modules/articleFilter";

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
  return getArticleList.handler({
    filters: createArticleFilter({ category, tagId }),
  });
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
