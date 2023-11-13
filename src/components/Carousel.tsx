import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length; // eslint-disable-line
  const lastIndex = length - frameSize;

  const isDisabledButtonPrev = (infinite && frameSize === length)
    || (currentIndex === 0 && !infinite);
  const isDisabledButtonNext = (infinite && frameSize === length)
    || (currentIndex === lastIndex && !infinite);

  const handlePrevSlide = () => {
    if (currentIndex - step > 0) {
      setCurrentIndex(currentIndex - step);
    } else {
      setCurrentIndex(0);
    }

    if (infinite && currentIndex === 0) {
      setCurrentIndex(lastIndex);
    }
  };

  const handleNextSlide = () => {
    if (currentIndex + step < lastIndex) {
      setCurrentIndex(currentIndex + step);
    } else {
      setCurrentIndex(lastIndex);
    }

    if (infinite && currentIndex === lastIndex) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrevSlide}
        disabled={isDisabledButtonPrev}
        className="Carousel__button Carousel__button-prev"
      >
        <span className="material-symbols-outlined">
          arrow_back_ios
        </span>
      </button>

      <ul
        className="Carousel__list"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        {images.map((image) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${-currentIndex * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
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

      <button
        type="button"
        data-cy="next"
        onClick={handleNextSlide}
        disabled={isDisabledButtonNext}
        className="Carousel__button Carousel__button-next"
      >
        <span className="material-symbols-outlined">
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
};

export default Carousel;
