export type Model<T> = {
  key: string;
  handler: () => Promise<T>;
};
