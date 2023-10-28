import React from 'react';
import cn from 'classnames';

import './Carousel.scss';
import { CarouselSettings } from '../types/CarouselSettings';
import { nextIndx, prevIndx } from '../utils';

interface Props extends CarouselSettings {
  currentImgIndx: number;
  handleCurrentImgIndx: (indx: number) => void;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  currentImgIndx,
  handleCurrentImgIndx,
}) => {
  const isPrevBtnDisabled
    = (currentImgIndx - step) < 0 && !infinite;
  const isNextBtnDisabled
    = (currentImgIndx + step) >= images.length && !infinite;

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
          borderRadius: `${itemWidth * 0.5}px`,
        }}
      >
        {
          images.map((image, indx) => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                transform: `translateX(-${itemWidth * currentImgIndx}px)`,
                transitionDuration: `${animationDuration}ms`,
              }}
            >
              <img
                className="Carousel__image"
                src={image}
                alt={`${indx + 1}`}
                width={itemWidth}
              />
            </li>
          ))
        }
      </ul>

      <button
        type="button"
        className={cn('Carousel__btn', {
          'Carousel__btn--disabled': isPrevBtnDisabled,
        })}
        aria-disabled={false}
        onClick={() => isPrevBtnDisabled
          || handleCurrentImgIndx(
            prevIndx(currentImgIndx, images.length, step) as number,
          )}
      >
        Prev
      </button>

      <button
        data-cy=""
        type="button"
        className={cn('Carousel__btn', {
          'Carousel__btn--disabled': isNextBtnDisabled,
        })}
        aria-disabled={false}
        onClick={() => (isNextBtnDisabled
          || handleCurrentImgIndx(
            nextIndx(currentImgIndx, images.length, step) as number,
          ))}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
