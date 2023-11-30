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

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImgPosition, setCurrentImgPosition] = useState(0);
  const finalImgPosition = images.length - frameSize;
  const isDisabledPrev = currentImgPosition === 0 && !infinite;
  const isDisabledNext = currentImgPosition === finalImgPosition && !infinite;

  function handlePrevImage() {
    if (currentImgPosition > 0) {
      setCurrentImgPosition(prev => (
        prev - step >= 0
          ? prev - step
          : 0
      ));
    } else {
      setCurrentImgPosition(finalImgPosition);
    }
  }

  function handleNextImage() {
    if (currentImgPosition < finalImgPosition) {
      setCurrentImgPosition(prev => (
        prev + step <= finalImgPosition
          ? prev + step
          : finalImgPosition
      ));
    } else {
      setCurrentImgPosition(0);
    }
  }

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(${-(currentImgPosition * itemWidth)}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            <img
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevImage}
          disabled={isDisabledPrev}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          onClick={handleNextImage}
          disabled={isDisabledNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
