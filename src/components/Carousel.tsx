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
  itemWidth = 100,
  frameSize = 3,
  step = 1,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;

  const handleNext = () => {
    const maxIndex = totalImages - frameSize;

    if (!infinite && currentIndex >= maxIndex) {
      return;
    }

    setCurrentIndex(prev =>
      infinite ? (prev + step) % totalImages : Math.min(prev + step, maxIndex),
    );
  };

  const handlePrev = () => {
    if (!infinite && currentIndex <= 0) {
      return;
    }

    setCurrentIndex(prev =>
      infinite
        ? (prev - step + totalImages) % totalImages
        : Math.max(prev - step, 0),
    );
  };

  return (
    <div
      className="Carousel"
      style={
        {
          '--item-width': `${itemWidth}px`,
          '--animation-duration': `${animationDuration}ms`,
          '--current-index': currentIndex,
        } as React.CSSProperties
      }
    >
      <div className="Carousel__list">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Carousel image ${index + 1}`}
            className="Carousel__image"
          />
        ))}
      </div>

      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        data-cy="prev"
        onClick={handlePrev}
        disabled={!infinite && currentIndex <= 0}
      >
        «
      </button>
      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= totalImages - frameSize}
      >
        »
      </button>
    </div>
  );
};

export default Carousel;
