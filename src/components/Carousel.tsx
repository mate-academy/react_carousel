import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  step,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex(state => {
      const lastItemPosition = images.length - frameSize;
      const nexItemPosition = state + step;

      if (state === lastItemPosition) {
        return 0;
      }

      if (nexItemPosition > lastItemPosition) {
        return lastItemPosition;
      }

      return nexItemPosition;
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex(state => {
      const lastItemPosition = images.length - frameSize;
      const prevItemPosition = state - step;

      if (state === 0) {
        return lastItemPosition;
      }

      if (prevItemPosition < 0) {
        return 0;
      }

      return prevItemPosition;
    });
  };

  const isLeftArrowEnabled = currentIndex > 0 || infinite;
  const isRightArrowEnabled = currentIndex < images.length - frameSize
  || infinite;

  const frameWidth = frameSize * itemWidth;
  const itemTransform = currentIndex * itemWidth;

  return (
    <div className="Carousel">
      <button
        className="Carousel__button"
        type="button"
        onClick={handlePrevClick}
        disabled={!isLeftArrowEnabled}
      >
        {'<'}
      </button>

      <div
        className="Carousel__list-container"
        style={{
          width: `${frameWidth}px`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((img, index) => (
            <li
              className="Carousel__item"
              key={img}
              style={{
                transition: `${animationDuration}ms`,
                transform: `translate(-${itemTransform}px)`,
              }}
            >
              <img
                className="Carousel__image"
                src={img}
                alt={`${index + 1}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className="Carousel__button"
        type="button"
        onClick={handleNextClick}
        disabled={!isRightArrowEnabled}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
