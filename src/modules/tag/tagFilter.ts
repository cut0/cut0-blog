export const createTagFilter = () => {
  const filterStrList: string[] = [];
  if (process.env.NODE_ENV === "production") {
    filterStrList.push("(isPublic[equals]true)");
  }
  return filterStrList.join("[and]");
};
