export const homePath = () => "/" as const;

export const recentlyPath = () => "/recently" as const;

export const recentlyTagPath = ({ tagId }: { tagId?: string }) => {
  if (!tagId) {
    return recentlyPath();
  }
  return `/recently/${tagId}` as const;
};

export const pickUpPath = () => "/pick-up" as const;

export const pickUpTagPath = ({ tagId }: { tagId?: string }) => {
  if (!tagId) {
    return pickUpPath();
  }
  return `/pick-up/${tagId}` as const;
};

export const articlePath = ({ articleId }: { articleId: string }) =>
  `/${articleId}` as const;
