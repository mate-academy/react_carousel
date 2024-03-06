import React, { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';
import { State } from '../interfaces/State';
import {
  DEFAULT_ITEM_WIDTH,
  DEFAULT_FRAME_SIZE,
  DEFAULT_STEP,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_INFINITE,
} from '../constants';

const Carousel: React.FC<State> = ({
  images,
  itemWidth = DEFAULT_ITEM_WIDTH,
  frameSize = DEFAULT_FRAME_SIZE,
  step = DEFAULT_STEP,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  infinite = DEFAULT_INFINITE,
}) => {
  // функція стану зміщення слайдера
  const [slideOffset, setSlideOffset] = useState(0);
  // функції станів кнопок
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  // функція кнопки 'вперед'
  const nextSlide = () => {
    const lastOffset = (images.length - frameSize) * (-itemWidth - 20);

    if (slideOffset > lastOffset) {
      const newOffset = Math.max(
        slideOffset - step * (itemWidth + 20),
        lastOffset,
      );

      setSlideOffset(newOffset);
      setIsPrevDisabled(false);

      if (infinite) {
        setIsNextDisabled(false);
      } else {
        setIsNextDisabled(newOffset === lastOffset);
      }
    } else if (infinite) {
      setSlideOffset(0);
      setIsPrevDisabled(false);
      setIsNextDisabled(false);
    }
  };

  // функція кнопки 'назад'
  const prevSlide = () => {
    if (slideOffset <= -itemWidth - 20) {
      const newOffset = Math.min(slideOffset + step * (itemWidth + 20), 0);

      setSlideOffset(newOffset);
      setIsNextDisabled(false);

      if (infinite) {
        setIsPrevDisabled(false);
      } else {
        setIsPrevDisabled(newOffset >= 0);
      }
    } else if (infinite) {
      setSlideOffset((images.length - frameSize) * (-itemWidth - 20));
      setIsNextDisabled(false);
      setIsPrevDisabled(false);
    }
  };

  // функція створення самого слайдера
  const carouselList = () => {
    // повертаємо список, в якому кожен елемент використовує рядок з адресою зображення
    return (
      <div
        className="Carousel__slider"
        style={{ width: `${frameSize * (itemWidth + 20) - 20}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${images.length * (itemWidth + 20) - 20}px`,
            transform: `translateX(${slideOffset}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((url, index) => {
            return (
              <li key={url} className="Carousel__item">
                <img
                  src={url}
                  alt={String(index + 1)}
                  style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="Carousel">
      <button
        data-cy="next"
        className={classNames('Carousel__button prevButton', {
          'Carousel__button--disabled': isPrevDisabled,
        })}
        type="button"
        onClick={prevSlide}
      >
        {'\u2BA8'}
      </button>
      {carouselList()}
      <button
        className={classNames('Carousel__button nextButton', {
          'Carousel__button--disabled': isNextDisabled,
        })}
        type="button"
        onClick={nextSlide}
      >
        {'\u2BAB'}
      </button>
    </div>
  );
};

export default Carousel;
