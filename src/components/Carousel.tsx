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
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(images.length - frameSize, 0);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const isPrevDisabled = !infinite && safeIndex === 0;
  const isNextDisabled = !infinite && safeIndex === maxIndex;

  const handleNext = () => {
    if (infinite && safeIndex === maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(safeIndex + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite && safeIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(Math.max(safeIndex - step, 0));
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        aria-label="Previous"
        className={`Carousel__button ${isPrevDisabled ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        &larr;
      </button>

      <div
        className="Carousel__window"
        style={{ width: itemWidth * frameSize }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${safeIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li
              key={img}
              className="Carousel__item"
              style={{ width: itemWidth }}
            >
              <img
                className="Carousel__image"
                src={img}
                width={itemWidth}
                alt={`Image ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        aria-label="Next"
        className={`Carousel__button ${isNextDisabled ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Carousel;
