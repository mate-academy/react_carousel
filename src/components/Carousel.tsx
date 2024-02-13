import React, { useState } from 'react';
import cn from 'classnames';

import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const NEXT = 'NEXT';
  const PREV = 'PREV';

  const handleOnClickButton = (direction: string) => {
    switch (direction) {
      case NEXT:
        setCurrentIndex(
          prevIndex => Math.min(prevIndex + step, images.length - frameSize),
        );
        break;

      case PREV:
        setCurrentIndex(prevIndex => Math.max(prevIndex - step, 0));
        break;

      default:
        throw new Error('Incorrect action');
    }
  };

  return (
    <div className="container">
      <div className="Carousel">
        <button
          className={cn('Carousel__button', 'Carousel__button--prev', {
            disabled: currentIndex === 0,
          })}
          type="button"
          onClick={() => handleOnClickButton(PREV)}
        >
          Prev
        </button>

        <div className="wrapper" style={{ width: `${itemWidth * frameSize}px` }}>
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((el, index) => (
              <li key={el}>
                <img
                  className="Carousel__image"
                  src={el}
                  alt={`${index + 1}`}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          className={cn('Carousel__button', 'Carousel__button--next', {
            disabled: currentIndex >= images.length - frameSize,
          })}
          type="button"
          data-cy="next"
          onClick={() => handleOnClickButton(NEXT)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
