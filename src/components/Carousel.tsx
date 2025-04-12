/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const lastPosition = -(images.length - frameSize);
  const nextDisabled = position === lastPosition && !infinite;
  const prevDisabled = position === 0 && !infinite;

  const handlePrevPosition = () => {
    if (position < 0) {
      setPosition(prevPosition =>
        prevPosition + step < 0 ? prevPosition + step : 0,
      );
    } else {
      setPosition(lastPosition);
    }
  };

  const handleNextPosition = () => {
    if (position > lastPosition) {
      setPosition(prevPosition =>
        prevPosition - step > lastPosition ? prevPosition - step : lastPosition,
      );
    } else {
      setPosition(0);
    }
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(${position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel__image"
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevPosition}
          disabled={prevDisabled}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={handleNextPosition}
          disabled={nextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
