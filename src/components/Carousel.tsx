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

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const total = images.length;
  const lastStart = Math.max(0, total - frameSize);
  const frameWidth = frameSize * itemWidth;
  const translateX = startIndex * itemWidth;

  const clampIndex = (index: number) => {
    // Non-infinite mode: clamp between 0 and lastStart
    if (!infinite) {
      return Math.min(Math.max(index, 0), lastStart);
    }

    // Infinite mode: wrap within valid start positions
    const range = lastStart + 1;

    if (range <= 0) {
      return 0;
    }

    return ((index % range) + range) % range;
  };

  const handlePrev = () => {
    setStartIndex(prev => clampIndex(prev - step));
  };

  const handleNext = () => {
    setStartIndex(prev => clampIndex(prev + step));
  };

  const isPrevDisabled = !infinite && startIndex === 0;
  const isNextDisabled = !infinite && startIndex === lastStart;

  return (
    <div className="Carousel">
      <button type="button" onClick={handlePrev} disabled={isPrevDisabled}>
        Prev
      </button>

      <div className="Carousel__frame" style={{ width: frameWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((url, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{ width: itemWidth }}
            >
              <img className="Carousel__img" src={url} alt={`${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
