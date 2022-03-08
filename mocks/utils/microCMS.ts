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
  if (offset) {
    res = res.splice(0, offset);
  }
  if (limit) {
    res = res.slice(0, limit);
  }
  return res;
};
