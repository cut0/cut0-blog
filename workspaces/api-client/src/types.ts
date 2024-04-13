import { MicroCMSQueries } from "microcms-js-sdk";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export type MicroCmsContent<T> = MicroCMSContentId & MicroCMSDate & T;

export type MircoCmsImage = {
  url: string;
  height: number;
  width: number;
};

export type MicroCmsGetListModel<T> = {
  key: string;
  handler: (queries: MicroCMSQueries) => Promise<T>;
};

export type MicroCmsGetModel<T> = {
  key: string;
  handler: (id: string, queries: MicroCMSQueries) => Promise<T>;
};
