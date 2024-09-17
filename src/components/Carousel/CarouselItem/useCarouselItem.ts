import { useEffect, useMemo, useRef } from 'react';

export interface UseCarouselItemProps {
  index: number;
  itemWidth?: number;
  currentIdx: number;
  frameSize: number;
  animationDuration: number;
  onMount: (element: HTMLImageElement) => void;
}

export const useCarouselItem = ({
  itemWidth = 130,
  frameSize,
  animationDuration,
  index,
  currentIdx,
  onMount,
}: UseCarouselItemProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const initialStyles = useMemo(() => {
    const widthPercent = 100 / frameSize;

    return {
      width: `${widthPercent}%`,
      left: `${index * widthPercent}%`,
      transition: `transform ${animationDuration}ms ease-out`,
    };
  }, [frameSize, index, animationDuration]);

  const transformStyles = useMemo(
    () => ({ transform: `translateX(${-100 * currentIdx}%)` }),
    [currentIdx],
  );

  const imageStyles = useMemo(
    () => ({
      maxWidth: '100%',
      opacity: index > currentIdx + frameSize - 1 ? 0 : 1,
      transition: `opacity ${animationDuration}ms ease-out`,
    }),
    [currentIdx, frameSize],
  );

  useEffect(() => {
    const imageSizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.contentRect.height) {
            onMount(entry.target as HTMLImageElement);
          }
        }
      },
    );

    if (imgRef.current) {
      imageSizeObserver.observe(imgRef.current);
    }

    return () => {
      imageSizeObserver.unobserve(imgRef.current as HTMLImageElement);
    };
  }, []);

  return {
    imgRef,
    imgWidth: itemWidth,
    carouselItemStyles: { ...initialStyles, ...transformStyles },
    imageStyles,
  };
};
