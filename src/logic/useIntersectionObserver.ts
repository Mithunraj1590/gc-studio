import { useState, useEffect, RefObject } from "react";

interface UseIntersectionObserverProps {
  targetRef: RefObject<Element>;
  repeat?: boolean;
  threshold?: number | number[];
  options?: IntersectionObserverInit;
}

interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
}

export const useIntersectionObserver = ({
  targetRef,
  repeat = false,
  threshold,
  options = {}
}: UseIntersectionObserverProps): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isIntersecting && repeat) {
          setIsIntersecting(entry.isIntersecting);
        } else if (repeat) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold, ...options }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef, options, isIntersecting, repeat, threshold]);

  return { isIntersecting };
};

