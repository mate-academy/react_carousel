/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
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
  const [transformSize, setTransformSize] = useState(0);

  const imageStyle = {
    width: `${itemWidth}px`,
  };

  const itemStyle = {
    transform: `translateX(${transformSize}px)`,
    transition: `transform ${animationDuration}s ease-in-out`,
  };

  const listStyle = {
    width: `${(itemWidth * frameSize)}px`,
  };

  const handleNext = () => {
    setTransformSize((prev) => prev - (itemWidth * step) - 10);
    console.log(frameSize);
    console.log(infinite);
  };

  const handlePrev = () => {
    setTransformSize((prev) => prev + (itemWidth * step));
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={listStyle}>
        {images.map((image, idx) => (
          <li
            className="Carousel__item"
            style={itemStyle}
            key={image}
          >
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
