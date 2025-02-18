import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
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

  useEffect(() => {
    const fullShift = `-${itemWidth * maxShift}px`;

    document.documentElement.style.setProperty('--shift', fullShift);
    document.documentElement.style.setProperty(
      '--animation-duration',
      `${animationDuration}ms`,
    );
  }, [itemWidth, maxShift, animationDuration]);

  const showNext = () => {
    if (infinite && currentShift === maxShift) {
      setCurrentShift(0);
    } else {
      setCurrentShift(prev => Math.min(prev + step, maxShift));
    }
  };

  const showPrev = () => {
    if (infinite && currentShift === 0) {
      setCurrentShift(maxShift);
    } else {
      setCurrentShift(prev => Math.max(0, prev - step));
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
          className={classNames('Carousel__list', {
            'Carousel__list--animated': infinite,
          })}
          style={{
            transition: `all 100ms ease`,
            transform: `translateX(-${currentShift * itemWidth}px)`,
          }}
        >
          {images.map((image, index) => (
            <li className="Carousel__item" key={`${image}-${index}`}>
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
          disabled={!infinite && currentShift === 0}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={showNext}
          disabled={!infinite && currentShift === maxShift}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};
