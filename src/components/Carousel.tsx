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
  const maxPosition = -(images.length - frameSize);
  const nextDisabled = position === maxPosition && !infinite;
  const prevDisabled = position === 0 && !infinite;

  const handleNextPosition = () => {
    if (position > maxPosition) {
      setPosition(prevPosition =>
        prevPosition - step > maxPosition ? prevPosition - step : maxPosition,
      );
    } else {
      setPosition(0);
    }
  };

  const handlePrevPosition = () => {
    if (position < 0) {
      setPosition(prevPosition =>
        prevPosition + step < 0 ? prevPosition + step : 0,
      );
    } else {
      setPosition(maxPosition);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
          height: `${itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position * itemWidth}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li key={index}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevPosition}
          disabled={prevDisabled}
        >
          {'<<'}
        </button>
        <button
          className="Carousel__button"
          type="button"
          onClick={handleNextPosition}
          data-cy="next"
          disabled={nextDisabled}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
