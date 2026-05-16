import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gap = 10;
  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + step;

      if (infinite) {
        return nextIndex > maxIndex ? 0 : nextIndex;
      }

      return nextIndex > maxIndex ? (maxIndex < 0 ? 0 : maxIndex) : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex - step;

      if (infinite) {
        return nextIndex < 0 ? (maxIndex < 0 ? 0 : maxIndex) : nextIndex;
      }

      return nextIndex < 0 ? 0 : nextIndex;
    });
  };

  const frameWidth = frameSize * itemWidth + (frameSize - 1) * gap;
  const listWidth = images.length * itemWidth + (images.length - 1) * gap;
  const translateX = -(currentIndex * (itemWidth + gap));

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextIndex = !infinite && (currentIndex >= maxIndex || maxIndex <= 0);

  return (
    <div className="Carousel-Container">
      <button
        type="button"
        className={`Carousel__btn ${isPrevDisabled ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
        aria-label="Previous"
      >
        &#8249;
      </button>
      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list "
          style={{
            width: `${listWidth}px`,
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((imag, index) => (
            <li
              key={index}
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            >
              <img
                src={imag}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        data-cy="next"
        type="button"
        className={`Carousel__btn ${isNextIndex ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={isNextIndex}
        aria-label="Next"
      >
        &#8250;
      </button>
    </div>
  );
};
