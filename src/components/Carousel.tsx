import React, { useState } from 'react';
import { Props } from '../types/Props';
import './Carousel.scss';

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

  const showNext = () => {
    setCurrentShift(prev => Math.min(prev + step, maxShift));
  };

  const showPrev = () => {
    setCurrentShift(prev => Math.max(0, prev - step));
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
            transition: `all 100ms ease`,
            transform: `translateX(-${currentShift * itemWidth}px)`,
          }}
        >
          {images.map((image, index) => (
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
          onClick={showPrev}
          disabled={infinite}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={showNext}
          disabled={infinite}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};
