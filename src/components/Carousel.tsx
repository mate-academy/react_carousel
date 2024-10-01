import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Props } from '../type/Props';
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
    // Якщо infinite mode увімкнений і досягли останнього зображення
    if (infinite && currentShift === maxShift) {
      setCurrentShift(0); // Повертаємося до першого зображення
    } else {
      setCurrentShift(prev => Math.min(prev + step, maxShift));
    }
  };

  const showPrev = () => {
    // Якщо infinite mode увімкнений і ми на першому зображенні
    if (infinite && currentShift === 0) {
      setCurrentShift(maxShift); // Переходимо до останнього зображення
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
            transition: `all ${animationDuration}ms ease`,
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
          // Якщо infinite mode активований, кнопка активна завжди
          disabled={!infinite && currentShift === maxShift}
        >
          Next
        </button>
      </div>
    </div>
  );
};
