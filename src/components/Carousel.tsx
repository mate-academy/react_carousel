import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const START_INDEX = 0;
const MIN_STEP = 1;

const SlideItem: React.FC<{
  src: string;
  size: number;
  itemIndex: number;
  currentIndex: number;
  frameSize: number;
}> = ({ src, size, itemIndex, currentIndex, frameSize }) => {
  const isVisible = itemIndex >= currentIndex && itemIndex < currentIndex + frameSize;

  return (
    <li
      className="Carousel__item"
      style={{
        width: size,
        flex: '0 0 auto',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <img
        className="Carousel__img"
        src={src}
        alt={`Slide ${itemIndex + 1}`}
        width={size}
        height={size}
        style={{ height: size }}
      />
    </li>
  );
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [index, setIndex] = useState(START_INDEX);

  const maxStartIndex = Math.max(START_INDEX, images.length - frameSize);
  const stepClamped = Math.max(MIN_STEP, Math.min(step, Math.max(MIN_STEP, images.length)));

  const isAtStart = index === START_INDEX;
  const isAtEnd = index >= maxStartIndex;

  const canPrev = infinite ? images.length > frameSize : !isAtStart;
  const canNext = infinite ? images.length > frameSize : !isAtEnd;

  const viewportWidth = frameSize * itemWidth;
  const translateX = -index * itemWidth;

  const handleNext = () => {
    if (!images.length) return;

    if (infinite) {
      setIndex(isAtEnd ? START_INDEX : Math.min(index + stepClamped, maxStartIndex));
      return;
    }

    if (!isAtEnd) {
      setIndex(Math.min(index + stepClamped, maxStartIndex));
    }
  };

  const handlePrev = () => {
    if (!images.length) return;

    if (infinite) {
      setIndex(isAtStart ? maxStartIndex : Math.max(index - stepClamped, START_INDEX));
      return;
    }

    if (!isAtStart) {
      setIndex(Math.max(index - stepClamped, START_INDEX));
    }
  };

  return (
    <div className="Carousel" style={{ width: viewportWidth }}>
      <div className="Carousel__viewport" style={{ width: viewportWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, i) => (
            <SlideItem
              key={src + i}
              src={src}
              size={itemWidth}
              itemIndex={i}
              currentIndex={index}
              frameSize={frameSize}
            />
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`Carousel__btn Carousel__btn--prev${!canPrev ? ' is-disabled' : ''}`}
        onClick={handlePrev}
        disabled={!canPrev}
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        type="button"
        className={`Carousel__btn Carousel__btn--next${!canNext ? ' is-disabled' : ''}`}
        onClick={handleNext}
        disabled={!canNext}
        aria-label="Next"
        data-cy="next"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
