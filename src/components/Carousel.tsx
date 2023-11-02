import React from 'react';
import cn from 'classnames';

import './Carousel.scss';

type Props = {
  images: string[]
  width: number
  frameSize: number
  firstVisibleImage: number
  nextClick: () => void
  prevClick: () => void
  animationDuration: number
  infinite: boolean
  resizing: boolean
};

const Carousel: React.FC<Props> = (
  {
    images, width, frameSize, firstVisibleImage,
    nextClick, prevClick,
    animationDuration, infinite, resizing,
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
      {images.map((image, i) => (
        <li
          style={{
            width,
            height: width,
            transform: `translate(-${width * firstVisibleImage}px)`,
            transition: resizing ? 'none' : `transform ${animationDuration / 1000}s ease`,
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
          'Carousel__button--active': firstVisibleImage !== 0,
          'Carousel__button--disabled': firstVisibleImage === 0 && !infinite,
        })}
        onClick={prevClick}
      >
        ←
      </button>
      <button
        type="button"
        className={cn('Carousel__button', {
          'Carousel__button--active':
            firstVisibleImage !== images.length - frameSize,
          'Carousel__button--disabled':
            firstVisibleImage === images.length - frameSize && !infinite,
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
