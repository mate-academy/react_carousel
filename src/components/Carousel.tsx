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

  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + step;

      if (nextIndex > maxIndex) {
        return infinite ? 0 : maxIndex;
      }

      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - step;

      if (nextIndex < 0) {
        return infinite ? maxIndex : 0;
      }

      return nextIndex;
    });
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex === maxIndex;

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        overflow: 'hidden',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          display: 'flex',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((url, idx) => (
          <li
            key={url + idx}
            style={{
              flex: `0 0 ${itemWidth}px`,
              width: `${itemWidth}px`,
            }}
          >
            <img
              src={url}
              alt={`slide-${idx}`}
              width={itemWidth}
              style={{ display: 'block', width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
          data-cy="prev"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
