import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const maxIndex = Math.max(0, images.length - frameSize);
  const activeIndex = Math.min(currentIndex, maxIndex);

  const handleNext = () => {
    if (activeIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    } else if (infinite) {
      setCurrentIndex(maxIndex);
    }
  };

  const isPrevDisabled = !infinite && activeIndex === 0;
  const isNextDisabled = !infinite && activeIndex === maxIndex;

  const frameWidth = frameSize * itemWidth;
  const translateX = activeIndex * itemWidth;

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        &#8249;
      </button>

      <div
        className="Carousel__frame"
        style={{
          width: `${frameWidth}px`,
        }}
      >
        <ul
          className="Carousel__track"
          style={{
            transform: `translateX(-${translateX}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((url, index) => (
            <li
              key={`${url}-${index}`}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="Carousel__image"
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className="Carousel__button Carousel__button--next"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
