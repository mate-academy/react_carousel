import React, { useState, useMemo } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number; // optional, default will be set
  frameSize?: number; // optional
  step?: number; // optional
  animationDuration?: number; // optional
  infinite?: boolean; // optional
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130, // default value set here
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const containerWidth = useMemo(
    () => itemWidth * images.length,
    [itemWidth, images.length],
  );

  const handleNext = () => {
    const newIndex = currentIndex + step;

    if (newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex - step;

    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    } else if (infinite) {
      setCurrentIndex(maxIndex);
    }
  };

  return (
    <div className="carousel-container">
      <h1 data-cy="title">Carousel</h1>

      <div
        className="carousel-frame"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="carousel-items"
          style={{
            width: `${containerWidth}px`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} className="carousel-list-item">
              <img
                src={image}
                alt={`carousel-item-${index}`}
                style={{ width: `${itemWidth}px`, height: 'auto' }}
                className="carousel-item"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="carousel-button prev"
        data-cy="prev"
        onClick={handlePrev}
        disabled={!infinite && currentIndex === 0}
      >
        Previous
      </button>

      <button
        className="carousel-button next"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
