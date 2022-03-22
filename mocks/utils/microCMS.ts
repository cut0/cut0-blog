import { MicroCMSQueries } from "microcms-js-sdk";

export const formatMicroCMSContent = <T>(
  data: (T & { id: string })[],
  { id, limit, offset }: MicroCMSQueries & { id?: string },
): (T & { id: string })[] => {
  return data
    .filter((item) => {
      return id ? item.id === id : true;
    })
    .slice(
      offset ? offset : undefined,
      limit ? (offset ? offset + limit : limit) : undefined,
    );
};
