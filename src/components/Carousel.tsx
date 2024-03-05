import React, { useState } from 'react';
import './Carousel.scss';
import { Props } from '../types/Props';

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    if (infinite) {
      if (currentIndex !== 0) {
        return setCurrentIndex(currentIndex - step);
      }

      return setCurrentIndex(images.length - 1);
    }

    return setCurrentIndex(currentIndex === 1 ? 0 : currentIndex - step);
  };

  const next = () => {
    if (infinite) {
      if (currentIndex + step < images.length) {
        return setCurrentIndex(currentIndex + step);
      }

      return setCurrentIndex(0);
    }

    return setCurrentIndex(
      currentIndex + step >= images.length
        ? images.length - frameSize
        : currentIndex + step,
    );
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                className="Carousel__img"
                width={itemWidth}
                src={image}
                alt={`${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          disabled={!infinite && currentIndex < 1}
          onClick={prev}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          disabled={!infinite && currentIndex + step >= images.length}
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
