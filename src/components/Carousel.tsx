import React, { useState } from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startingPosition, setStartingPosition] = useState(0);

  const isLastImage = !infinite
    ? startingPosition + frameSize >= images.length
    : false;

  const isFirstImage = !infinite
    ? !startingPosition
    : false;

  const scrollLogic = () => {
    if ((startingPosition + step + frameSize) >= images.length) {
      setStartingPosition(images.length - frameSize);
    } else {
      setStartingPosition(startingPosition + step);
    }
  };

  const timeoutId = window.setTimeout(scrollLogic, animationDuration);

  const handlePrevClick = () => {
    if ((startingPosition - step) <= 0) {
      setStartingPosition(0);
    } else {
      setStartingPosition(startingPosition - step);
    }

    clearTimeout(timeoutId);
  };

  const handleNextClick = () => {
    scrollLogic();
    clearTimeout(timeoutId);
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((image, index) => {
          const isShown = (
            index >= startingPosition && index < startingPosition + frameSize
          );

          return (
            <li
              key={image}
              className="Carousel__item"
              style={{
                display: isShown ? 'block' : 'none',
              }}
            >
              <img
                src={image}
                alt={image}
                width={itemWidth}
              />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevClick}
          disabled={isFirstImage}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          onClick={handleNextClick}
          disabled={isLastImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};
