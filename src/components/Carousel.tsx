import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../types/CarouselProps';

const Carousel: React.FC<CarouselProps> = ({
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
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-(currentImgPosition * itemWidth)}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            <img
              className="Carousel__image"
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          type="button"
          className={
            isDisabledPrev
              ? 'Carousel__button Carousel__button--disable'
              : 'Carousel__button Carousel__button--active'
          }
          onClick={handlePrevImage}
          disabled={isDisabledPrev}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className={
            isDisabledNext
              ? 'Carousel__button Carousel__button--disable'
              : 'Carousel__button Carousel__button--active'
          }
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
