import React from 'react';
import cn from 'classnames';

import './Carousel.scss';

type Props = {
  images: string[]
  width: number
  frameSize: number
  range: { start: number; end: number }
  nextClick: () => void
  prevClick: () => void
  animationDuration: number
};

const Carousel: React.FC<Props> = (
  {
    images, width, frameSize,
    range: { start, end },
    nextClick, prevClick,
    animationDuration,
  },
) => (
  <div
    className="Carousel"
    style={{ width: width * frameSize }}
  >
    <ul
      className="Carousel__list"
      style={{
        height: width,

      }}
    >
      {images.slice(start, end).map((image, i) => (
        <li
          style={{
            width,
            height: width,
            transition: `${animationDuration / 1000}s ease`,
          }}
          className="Carousel__item"
          key={image}
        >
          <img
            style={{ width, height: width }}
            className="Carousel__image"
            src={image}
            alt={(i + 1).toString()}
          />
        </li>
      ))}
    </ul>

    <div className="Carousel__buttons">
      <button
        type="button"
        className={cn('Carousel__button', {
          'Carousel__button--active': start !== 0,
          'Carousel__button--disabled': start === 0,
        })}
        onClick={prevClick}
      >
        ←
      </button>
      <button
        type="button"
        className={cn('Carousel__button', {
          'Carousel__button--active': end !== images.length,
          'Carousel__button--disabled': end === images.length,
        })}
        data-cy="next"
        onClick={nextClick}
      >
        →
      </button>
    </div>
  </div>
);

export default Carousel;
