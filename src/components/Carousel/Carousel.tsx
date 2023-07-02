import React from 'react';
import cn from 'classnames';

import './Carousel.scss';

interface Props {
  images: string[],
  position : number,
  animationDuration : number,
  frameSize: number,
  itemWidth: number,
  isPrevBtnActive: boolean,
  handlePrevBtnClick: () => void
  isNextBtnActive: boolean,
  handleNextBtnClick: () => void
}

export const Carousel: React.FC<Props> = ({
  images,
  position,
  animationDuration,
  frameSize,
  itemWidth,
  isPrevBtnActive,
  handlePrevBtnClick,
  isNextBtnActive,
  handleNextBtnClick,
}) => {
  const widthCarouselBlock = frameSize * itemWidth;
  const translateCoords = position * -itemWidth;

  return (
    <div className="Carousel">
      <div
        className="Carousel__content"
        style={{
          maxWidth: `${widthCarouselBlock}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateCoords}px)`,
            transition: `transform ${animationDuration}ms linear`,
          }}
        >
          {images.map(image => (
            <li
              className="Carousel__item"
              style={{
                flexBasis: `${itemWidth}px`,
              }}
              key={image}
            >
              <img
                className="Carousel__image"
                src={image}
                alt="1"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__btns">
        <button
          type="button"
          disabled={!isPrevBtnActive}
          className={cn('Carousel__button', {
            'is-disabled': !isPrevBtnActive,
          })}
          onClick={handlePrevBtnClick}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={!isNextBtnActive}
          className={cn('Carousel__button', {
            'is-disabled': !isNextBtnActive,
          })}
          onClick={handleNextBtnClick}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};
