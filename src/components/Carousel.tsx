import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [startIndex, setStartIndex] = useState(0);

  const maxStartIndex = Math.max(0, images.length - frameSize);
  const currentIndex = Math.min(startIndex, maxStartIndex);

  const canMovePrevious = infinite
    ? images.length > frameSize
    : currentIndex > 0;

  const canMoveNext = infinite
    ? images.length > frameSize
    : currentIndex < maxStartIndex;

  const handleNext = () => {
    setStartIndex(current => {
      if (infinite && current >= maxStartIndex) {
        return 0;
      }

      return Math.min(current + step, maxStartIndex);
    });
  };

  const handlePrevious = () => {
    setStartIndex(current => {
      if (infinite && current === 0) {
        return maxStartIndex;
      }

      return Math.max(current - step, 0);
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: itemWidth * frameSize,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                width: itemWidth,
              }}
            >
              <img
                src={image}
                alt=""
                width={itemWidth}
                className="Carousel__image"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          data-cy="previous"
          disabled={!canMovePrevious}
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button
          type="button"
          data-cy="next"
          disabled={!canMoveNext}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
