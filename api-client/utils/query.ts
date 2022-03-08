export const formatQueries = (queries: unknown) => {
  return new URLSearchParams(JSON.stringify(queries));
};
