export type FlagList = {
  favoriteArticle: boolean;
};

export const getFeatureFlag = (): FlagList => {
  return {
    favoriteArticle: false,
  };
};
