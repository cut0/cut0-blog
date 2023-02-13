export const createTagFilter = () => {
  const filterStrList: string[] = [];
  if (import.meta.env.MODE === "production") {
    filterStrList.push("(isPublic[equals]true)");
  }
  return filterStrList.join("[and]");
};
