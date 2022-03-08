export const formatQueries = (queries: unknown) => {
  return new URLSearchParams(queries as { [key: string]: string }).toString();
};
