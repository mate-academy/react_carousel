import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);
  const offset = startIndex * itemWidth;
  const viewportWidth = itemWidth * frameSize;

  const handleNext = () => {
    if (infinite && startIndex === maxIndex) {
      setStartIndex(0);

      return;
    }

    setStartIndex(Math.min(startIndex + step, maxIndex));
  };

  const handlePrev = () => {
    if (infinite && startIndex === 0) {
      setStartIndex(maxIndex);

      return;
    }

    setStartIndex(Math.max(startIndex - step, 0));
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="button button__prev"
        onClick={handlePrev}
        disabled={!infinite && startIndex === 0}
      >
        ❮
      </button>

      <div
        className="carousel__viewport"
        style={{ width: `${viewportWidth}px` }}
      >
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                className="carousel__image"
                alt={`image ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="button button__next"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && startIndex === maxIndex}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
