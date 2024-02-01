import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';
import { ValuesImgType } from '../../types/Types';

type Props = {
  valuesImage: ValuesImgType;
};

export const Carousel: React.FC<Props> = ({ valuesImage }) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = valuesImage;
  const [transform, setTransform] = useState(0);
  const isLastPosition = images.length - frameSize;

  function transitionNext() {
    if (transform + step < isLastPosition) {
      setTransform(transform + step);
    } else {
      setTransform(isLastPosition);
    }

    if (infinite && transform === isLastPosition) {
      setTransform(0);
    }
  }

  function transitionPrev() {
    if (transform - step > 0) {
      setTransform(transform - step);
    } else {
      setTransform(0);
    }

    if (infinite && transform === 0) {
      setTransform(isLastPosition);
    }
  }

  return (
    <>
      <div className="carousel">
        <ul
          className="carousel__list"
          style={{ width: `${(itemWidth * frameSize)}px` }}
        >
          {images.map(image => {
            return (
              <li
                key={image}
                className="carousel__items"
                style={{
                  transition: `transform ${animationDuration}ms`,
                  transform: `translateX(${-transform * itemWidth}px`,
                  width: `${step}`,
                }}
              >
                <img
                  width={itemWidth}
                  src={image}
                  alt="Emoji"
                  className="carousel__image"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="carousel-buttons">
        <button
          type="button"
          className={cn(
            'button',
            {
              'is-success': infinite || transform !== 0,
              'is-light': infinite || transform !== 0,
              'disablet-btn': !infinite && transform === 0,
            },
          )}
          onClick={transitionPrev}
        >
          Prev
        </button>
        <button
          type="button"
          className={cn(
            'button',
            {
              'is-success': infinite || transform !== isLastPosition,
              'is-light': infinite || transform !== isLastPosition,
              'disablet-btn': !infinite && transform === isLastPosition,
            },
          )}
          onClick={transitionNext}
        >
          Next
        </button>
      </div>
    </>
  );
};
