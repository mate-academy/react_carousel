import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const GAP = 10;

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const maxIndex = Math.max(images.length - frameSize, 0);
  const currentIndex = Math.min(startIndex, maxIndex);

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex === maxIndex;

  const handlePrev = () => {
    if (infinite && currentIndex === 0) {
      setStartIndex(maxIndex);

      return;
    }

    setStartIndex(Math.max(currentIndex - step, 0));
  };

  const handleNext = () => {
    if (infinite && currentIndex === maxIndex) {
      setStartIndex(0);

      return;
    }

    setStartIndex(Math.min(currentIndex + step, maxIndex));
  };

  const itemSpace = itemWidth + GAP;

  return (
    <div className="Carousel">
      <button
        type="button"
        className={`Carousel__button Carousel__button--prev ${isPrevDisabled ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
        aria-label="Prev"
      >
        ‹
      </button>

      <div
        className="Carousel__frame"
        style={{ width: frameSize * itemSpace - GAP }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: GAP,
            transform: `translateX(-${currentIndex * itemSpace}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`Carousel__button Carousel__button--next ${isNextDisabled ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label="Next"
        data-cy="next"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
