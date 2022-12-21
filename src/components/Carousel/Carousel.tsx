/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import './Carousel.scss';

import type { State as CarouselProps } from '../../App';

export const Carousel: FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const imageStyle = {
    width: `${itemWidth}px`,
  };

  const listStyle = {
    transition: `transform ${animationDuration}ms ease-out`,

  };

  const handleNext = () => {
    console.log('Next');
    console.log(frameSize);
    console.log(infinite);
  };

  const handlePrev = () => {
    console.log(step);
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((image, idx) => (
          <li className="Carousel__item" style={listStyle}>
            <img
              src={image}
              alt={String(idx + 1)}
              className="Carousel__image"
              style={imageStyle}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          type="button"
          onClick={handlePrev}
          className="Carousel__button Carousel__button--prev"
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          className="Carousel__button Carousel__button--next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
