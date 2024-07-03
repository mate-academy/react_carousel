import { useState } from 'react';

interface UseCarouselProps {
  imagesQty: number;
  frameSize: number;
  step: number;
}

export const useCarousel = ({
  frameSize,
  imagesQty,
  step,
}: UseCarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);

  const setHeight = (item: HTMLImageElement) => {
    if (carouselHeight < item.clientHeight) {
      setCarouselHeight(item.clientHeight);
    }
  };

  const onPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => (prev - step >= 0 ? prev - step : 0));
    }
  };

  const onNext = () => {
    if (currentIdx < imagesQty - frameSize) {
      setCurrentIdx(prev =>
        prev + step <= imagesQty ? prev + step : imagesQty - frameSize,
      );
    }
  };

  return {
    currentIdx,
    carouselHeight,
    setHeight,
    onPrev,
    onNext,
  };
};
