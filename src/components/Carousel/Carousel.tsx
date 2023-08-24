import React, { useState } from 'react';
import './Carousel.scss';
import { Setup } from '../../types/setup';

const Carousel: React.FC<Setup> = ({
  images, itemWidth, frameSize, step, animationDuration,
}) => {
  const [translateX, setTranslateX] = useState(0);

  const frameWidth = itemWidth * frameSize;
  const maxTranslateXValue = -itemWidth * (images.length - frameSize);

  const handlePrevClick = () => {
    const prevTranslateX = translateX + itemWidth * step;
    const minTranslateX = 0;

    setTranslateX(Math.min(prevTranslateX, minTranslateX));
  };

  const handleNextClick = () => {
    const nextTranslateX = translateX - itemWidth * step;

    setTranslateX(Math.max(nextTranslateX, maxTranslateXValue));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${frameWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms ease 0s`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                className="Carousel__image"
                src={image}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__navigation">
          <button
            className="Carousel__button"
            type="button"
            onClick={handlePrevClick}
            disabled={translateX >= 0}
          >
            🡠
          </button>
          <button
            className="Carousel__button"
            type="button"
            data-cy="next"
            onClick={handleNextClick}
            disabled={translateX <= maxTranslateXValue}
          >
            🡢
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
