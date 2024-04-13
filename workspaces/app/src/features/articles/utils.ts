export const createArticleFilter = ({
  category,
  tagId,
}: {
  category: "recently" | "pick-up";
  tagId?: string;
}) => {
  const filterStrList: string[] = [];
  if (category === "pick-up") {
    filterStrList.push("(isPicked[equals]true)");
  }
  if (tagId) {
    filterStrList.push(`(tags[contains]${tagId})`);
  }
  if (import.meta.env.MODE === "production") {
    filterStrList.push("(isPublic[equals]true)");
  }
  return filterStrList.join("[and]");
};
