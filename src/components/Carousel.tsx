import React, { useEffect, useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const ITEM_GAP = 12;

const getPositiveInteger = (value: number, fallback: number) => {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.floor(value));
};

const getDuration = (value: number) => {
  if (!Number.isFinite(value)) {
    return 1000;
  }

  return Math.max(0, value);
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const safeItemWidth = getPositiveInteger(itemWidth, 130);
  const safeFrameSize = getPositiveInteger(frameSize, 3);
  const safeStep = getPositiveInteger(step, 3);
  const safeAnimationDuration = getDuration(animationDuration);
  const lastPossibleIndex = Math.max(0, images.length - safeFrameSize);
  const visibleIndex = Math.min(firstVisibleIndex, lastPossibleIndex);
  const frameWidth =
    safeFrameSize * safeItemWidth + (safeFrameSize - 1) * ITEM_GAP;
  const itemStride = safeItemWidth + ITEM_GAP;
  const isScrollable = lastPossibleIndex > 0;
  const canGoPrevious = isScrollable && (infinite || visibleIndex > 0);
  const canGoNext =
    isScrollable && (infinite || visibleIndex < lastPossibleIndex);

  useEffect(() => {
    setFirstVisibleIndex(index => Math.min(index, lastPossibleIndex));
  }, [lastPossibleIndex]);

  const showPrevious = () => {
    if (!canGoPrevious) {
      return;
    }

    setFirstVisibleIndex(index => {
      const currentIndex = Math.min(index, lastPossibleIndex);

      if (infinite && currentIndex === 0) {
        return lastPossibleIndex;
      }

      return Math.max(0, currentIndex - safeStep);
    });
  };

  const showNext = () => {
    if (!canGoNext) {
      return;
    }

    setFirstVisibleIndex(index => {
      const currentIndex = Math.min(index, lastPossibleIndex);

      if (infinite && currentIndex === lastPossibleIndex) {
        return 0;
      }

      return Math.min(lastPossibleIndex, currentIndex + safeStep);
    });
  };

  return (
    <section className="Carousel" aria-label="Image carousel">
      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${visibleIndex * itemStride}px)`,
            transitionDuration: `${safeAnimationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={`${image}-${index}`}
              style={{ width: `${safeItemWidth}px` }}
            >
              <img
                src={image}
                alt={`Carousel item ${index + 1}`}
                width={safeItemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <button
          className={`Carousel__button ${
            canGoPrevious ? '' : 'Carousel__button--disabled'
          }`}
          type="button"
          disabled={!canGoPrevious}
          onClick={showPrevious}
        >
          Previous
        </button>

        <button
          className={`Carousel__button ${
            canGoNext ? '' : 'Carousel__button--disabled'
          }`}
          type="button"
          disabled={!canGoNext}
          onClick={showNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Carousel;
