import { useRouter } from "next/router";
import { useEffect } from "react";
import { pageView } from "../../utils/analytics";

export const usePageView = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (
      path: string,
      { shallow }: { shallow: boolean },
    ) => {
      if (!shallow) {
        pageView(path);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
