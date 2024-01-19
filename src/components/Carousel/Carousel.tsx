import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselRules } from '../../types/CarouselRules';

type Props = {
  images: string[],
  carouselRules: CarouselRules,
};

const Carousel: React.FC<Props> = ({
  images,
  carouselRules: {
    animationDuration,
    itemWidth,
    step,
    frameSize,
  },
}) => {
  const [translateXValue, setTranslateXValue] = useState(0);

  const handleNextButtonClicked = () => {
    const newTranslateXValue = Math.min(
      (images.length - frameSize) * itemWidth,
      translateXValue + step * itemWidth,
    );

    setTranslateXValue(newTranslateXValue);
  };

  const handlePrevButtonClicked = () => {
    const newTranslateXValue = Math.max(0, translateXValue - step * itemWidth);

    setTranslateXValue(newTranslateXValue);
  };

  const maxTranslationXValue = (images.length - frameSize) * itemWidth;

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration}ms`,
          transform: `translateX(${-(translateXValue)}px)`,
        }}
      >
        {images.map(image => (
          <li
            className="Carousel__item"
            key={image}
          >
            <img
              style={{
                width: `${itemWidth}px`,
              }}
              className="Carousel__image"
              src={image}
              alt={image}
            />
          </li>
        ))}
      </ul>

      <button
        onClick={handlePrevButtonClicked}
        className="button is-info mr-2 Carousel__button--prev"
        type="button"
        disabled={translateXValue === 0}
      >
        Prev
      </button>
      <button
        onClick={handleNextButtonClicked}
        data-cy="next"
        className="button is-info Carousel__button--next"
        type="button"
        disabled={translateXValue === maxTranslationXValue}
      >
        Next
      </button>

    </div>
  );
};

export default Carousel;
