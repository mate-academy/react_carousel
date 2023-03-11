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
      if (state === images.length - frameSize) {
        return 0;
      }

      if (state + step > images.length - frameSize) {
        return images.length - frameSize;
      }

      return state + step;
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex(state => {
      if (state === 0) {
        return images.length - frameSize;
      }

      if (state - step < 0) {
        return 0;
      }

      return state - step;
    });
  };

  return (
    <div className="Carousel">
      <button
        className="Carousel__button"
        type="button"
        onClick={handlePrevClick}
        disabled={currentIndex === 0 && !infinite}
      >
        {'<'}
      </button>

      <div
        className="Carousel__list-container"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((img, index) => (
            <li
              className="Carousel__item"
              key={img}
              style={{
                transition: `${animationDuration}ms`,
                transform: `translate(-${currentIndex * itemWidth}px)`,
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
        disabled={currentIndex === images.length - step && !infinite}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
