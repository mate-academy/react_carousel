import React, { useState } from 'react';
import cn from 'classnames';
import { CarouselProps } from '../../types';
import './Carousel.scss';

const Carousel: React.FC<CarouselProps> = ({
  images,
  margin,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const maxImages = images.length - frameSize;
  const isDisabledPrev = currentImage === 0 && !infinite;
  const isDisabledNext = currentImage === maxImages && !infinite;

  const handlePrev = () => {
    return (
      currentImage !== 0
        ? setCurrentImage(currentImage - step >= 0
          ? currentImage - step
          : 0)
        : setCurrentImage(maxImages)
    );
  };

  const handleNext = () => {
    return (
      currentImage !== maxImages
        ? setCurrentImage(currentImage + step <= maxImages
          ? currentImage + step
          : maxImages)
        : setCurrentImage(0)
    );
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * (itemWidth + margin * 2)}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-(currentImage * (itemWidth + margin * 2))}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            <img
              className="Carousel__img"
              style={{
                margin: `0 ${margin}px`,
                transition: `margin ${animationDuration}ms ease`,
              }}
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          className={cn('Carousel__btn', {
            'Carousel__btn--disable': isDisabledPrev,
            'Carousel__btn--active': !isDisabledPrev,
          })}
          type="button"
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          Prev
        </button>

        <button
          className={cn('Carousel__btn', {
            'Carousel__btn--disable': isDisabledNext,
            'Carousel__btn--active': !isDisabledNext,
          })}
          data-cy="next"
          type="button"
          onClick={handleNext}
          disabled={isDisabledNext}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
