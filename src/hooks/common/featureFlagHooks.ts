import { useEffect, useState } from "react";
import { FlagList, getFeatureFlag } from "../../utils/featureFlag";

export const useFeatureFlag = () => {
  const [state, setState] = useState<FlagList>(getFeatureFlag());

  useEffect(() => {
    /** TODO プロダクションでない時には sessionStorage から Flag を取得できるようにする。 */
  }, []);

  const fetchFeatureFlagList = () => {
    /** TODO sessionStorege から featureFlag を取得する処理 */
  };

  const storeFeatureFlagList = () => {
    /** TODO featureFlagList を JSON にして、sessionStorageに登録する処理 */
  };

  return [state, storeFeatureFlagList] as const;
};
