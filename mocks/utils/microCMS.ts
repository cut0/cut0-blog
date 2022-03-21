import { MicroCMSQueries } from "microcms-js-sdk";

export const formatMicroCMSContent = <T>(
  data: (T & { id: string })[],
  { id, limit, offset }: MicroCMSQueries & { id?: string },
): (T & { id: string })[] => {
  const offsetVal = offset ? offset : 0;
  const limitVal = limit ? limit : 0;

  return data
    .filter((el) => {
      return id ? el.id === id : true;
    })
    .slice(
      offset ? offset : undefined,
      limit ? (offset ? offset + limit : limit) : undefined,
    );
};
