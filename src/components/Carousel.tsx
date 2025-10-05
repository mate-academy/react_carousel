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
  const spacing = 10;
  const effectiveWidth = itemWidth + spacing;
  const offset = currentIndex * effectiveWidth;
  const maxIndex = Math.max(0, images.length - frameSize);
  const frameWidth =
    frameSize * itemWidth + Math.max(0, frameSize - 1) * spacing;

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= maxIndex;

  const handlePrev = () => {
    if (isPrevDisabled) {
      return;
    }

    setCurrentIndex(prev => {
      let newIdx = prev - step;

      if (infinite) {
        const totalItems = images.length;

        newIdx = ((newIdx % totalItems) + totalItems) % totalItems;
        newIdx = Math.max(0, Math.min(newIdx, maxIndex));
      } else {
        newIdx = Math.max(0, newIdx);
      }

      return newIdx;
    });
  };

  const handleNext = () => {
    if (isNextDisabled) {
      return;
    }

    setCurrentIndex(prev => {
      let newIdx = prev + step;

      if (infinite) {
        const totalItems = images.length;

        newIdx = ((newIdx % totalItems) + totalItems) % totalItems;
        newIdx = Math.max(0, Math.min(newIdx, maxIndex));
      } else {
        newIdx = Math.min(newIdx, maxIndex);
      }

      return newIdx;
    });
  };

  return (
    <div
      className="Carousel"
      style={
        {
          '--frame-width': `${frameWidth}px`,
          '--item-width': `${itemWidth}px`,
          '--spacing': `${spacing}px`,
          '--offset': `${offset}px`,
          '--animation-duration': `${animationDuration}ms`,
        } as React.CSSProperties
      }
    >
      <ul className="Carousel__list">
        {images.map((img, i) => (
          <li key={i}>
            <img src={img} alt={`${i + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrev}
        className={`Carousel__button Carousel__button--prev ${isPrevDisabled ? 'disabled' : ''}`}
        disabled={isPrevDisabled}
        data-cy="prev"
      >
        ◀
      </button>
      <button
        type="button"
        onClick={handleNext}
        className={`Carousel__button Carousel__button--next ${isNextDisabled ? 'disabled' : ''}`}
        disabled={isNextDisabled}
        data-cy="next"
      >
        ▶
      </button>
    </div>
  );
};

export default Carousel;
