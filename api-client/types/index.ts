import { MicroCMSQueries, GetRequest } from "microcms-js-sdk";

export type MicroCMSGETListModel<T> = {
  key: string;
  handler: (queries?: MicroCMSQueries) => Promise<T>;
};

export type MicroCMSGETModel<T> = {
  key: string;
  handler: (id: string, queries?: MicroCMSQueries) => Promise<T>;
};
