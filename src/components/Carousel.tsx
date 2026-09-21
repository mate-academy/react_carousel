import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const frameWidth = itemWidth * frameSize;
  const maxPosition = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    const nextPosition = position + step;

    if (nextPosition <= maxPosition) {
      setPosition(nextPosition);
    } else if (infinite) {
      setPosition(0);
    } else {
      setPosition(maxPosition);
    }
  };

  const handlePrev = () => {
    const prevPosition = position - step;

    if (prevPosition >= 0) {
      setPosition(prevPosition);
    } else if (infinite) {
      setPosition(maxPosition);
    } else {
      setPosition(0);
    }
  };

  return (
    <div className="carousel">
      <button type="button" onClick={handlePrev}>
        Previous
      </button>

      <div
        className="carousel__frame"
        style={{
          width: `${frameWidth}px`,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(-${position * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="carousel__item"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={`Carousel item ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
