import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';
import { getImgs } from '../utils';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleImages = getImgs(images, startIndex, frameSize, infinite);
  const translateX =
    startIndex + step > images.length ? images.length - step : startIndex;

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: itemWidth * frameSize,
        }}
      >
        {visibleImages.map(({ link, isVisible }, index) => {
          return (
            <li className="Carousel__img" key={link}>
              <img
                src={link}
                alt={`${index + 1}`}
                width={itemWidth}
                style={{
                  visibility: isVisible ? 'initial' : 'hidden',
                  width: itemWidth,
                  height: itemWidth,
                  transform: !infinite
                    ? `translateX(${-1 * itemWidth * translateX}px)`
                    : `translateX(${-1 * itemWidth * (images.length - step)}px)`,
                  transition: !infinite
                    ? `transform ${animationDuration}ms ease-in-out`
                    : `transform ${animationDuration}ms ease-in-out`,
                }}
              />
            </li>
          );
        })}
      </ul>

      <button
        className={cn('Carousel__button', {
          'Carousel__button--disabled': startIndex === 0,
        })}
        type="button"
        onClick={() => {
          if (startIndex - step >= 0) {
            setStartIndex(startIndex - step);
          }
        }}
      >
        Prev
      </button>
      <button
        className={cn('Carousel__button', {
          'Carousel__button--disabled': startIndex >= 9,
        })}
        type="button"
        data-cy="next"
        onClick={() => {
          if (startIndex + step < images.length) {
            setStartIndex(startIndex + step);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};
