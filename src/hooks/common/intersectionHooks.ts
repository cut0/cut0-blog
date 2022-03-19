import { useEffect } from "react";
export const useIntersection = (
  ref: React.RefObject<HTMLElement>,
  {
    enable = true,
    once = false,
    threshold = 0,
    rootMargin = "200px",
    ...options
  }: {
    enable?: boolean;
    once?: boolean;
    threshold?: number;
  } & Omit<IntersectionObserverInit, "threshold">,
  onIntersection?: () => void,
  onRemoveIntersection?: () => void,
) => {
  useEffect(() => {
    if (!enable || ref.current === null) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !!onIntersection) {
        onIntersection();
      }
      if (!entry.isIntersecting && !!onRemoveIntersection && !once) {
        onRemoveIntersection();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersection, onRemoveIntersection, enable, once, options, ref]);

  if (!enable) {
    return true;
  }
};
