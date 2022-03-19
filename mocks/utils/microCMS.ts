import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSQueries,
} from "microcms-js-sdk";

type Data = (MicroCMSContentId & MicroCMSDate & unknown)[];

export const formatMicroCMSContent = (
  data: Data,
  { id, limit, offset }: MicroCMSQueries & { id?: string },
) => {
  let res = data;
  if (id) {
    res = res.filter((el) => el.id === id);
  }
  const offsetVal = offset ? offset : 0;
  const limitVal = limit ? limit : 0;
  res = res.slice(offsetVal, offsetVal + limitVal);

  return res;
};
