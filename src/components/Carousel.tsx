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

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentShift, setCurrentShift] = useState<number>(0);
  const maxShift = images.length - frameSize;

  if (currentShift > maxShift) {
    setCurrentShift(maxShift);
  }

  const fullShift = `-${itemWidth * maxShift}px`;

  document.documentElement.style.setProperty('--shift', fullShift);
  document.documentElement.style.setProperty(
    '--animation-duration',
    `${animationDuration}ms`,
  );

  const handleNext = () => {
    if (currentShift < maxShift) {
      setCurrentShift(prev => prev + step);
    } else if (infinite) {
      setCurrentShift(0);
    }
  };

  const handlePrev = () => {
    if (currentShift > 0) {
      setCurrentShift(prev => prev - step);
    } else if (infinite) {
      setCurrentShift(maxShift);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className={`Carousel__list ${infinite ? 'Carousel__list--animated' : ''}`}
          style={{
            transition: `all ${animationDuration}ms ease`,
            transform: `translateX(-${currentShift * itemWidth}px)`,
          }}
        >
          {images.map((image: string, index: number) => (
            <li className="Carousel__item" key={index}>
              <img
                className="Carousel__img"
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__button-group">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          disabled={currentShift === 0 && !infinite}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          disabled={currentShift >= maxShift && !infinite}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};
