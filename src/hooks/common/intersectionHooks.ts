import { useEffect, useRef } from "react";
export const useIntersection = (
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
  const ref = useRef(null);

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

  return ref;
};
