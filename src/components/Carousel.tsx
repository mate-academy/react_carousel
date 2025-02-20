import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = images.length - frameSize;
  const canGoNext = infinite || currentIndex < maxIndex;
  const canGoPrev = infinite || currentIndex > 0;

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }

    setCurrentIndex(prev => Math.min(prev + step, maxIndex));
  };

  const handlePrev = () => {
    if (!canGoPrev) {
      return;
    }

    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  return (
    <div className="carousel-container">
      <button
        className={`carousel-button prev ${!canGoPrev ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={!canGoPrev}
        data-cy="prev"
      >
        Previous
      </button>

      <div
        className="carousel-frame"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
            width: `${images.length * itemWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              className="carousel-item"
              style={{
                width: `${itemWidth}px`,
                visibility:
                  index >= currentIndex && index < currentIndex + frameSize
                    ? 'visible'
                    : 'hidden',
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`carousel-button next ${!canGoNext ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={!canGoNext}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
