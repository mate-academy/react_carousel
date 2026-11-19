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

  const maxIndex = Math.max(0, images.length - frameSize);

  const handlePrev = () => {
    if (infinite && currentIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => Math.max(0, prev - step));
    }
  };

  const handleNext = () => {
    if (infinite && currentIndex === maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + step));
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= maxIndex;

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={image + index}
            className="Carousel__item"
            style={{ width: `${itemWidth}px` }}
          >
            <img
              src={image}
              alt={`slide-${index + 1}`}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button type="button" onClick={handlePrev} disabled={isPrevDisabled}>
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Далі
        </button>
      </div>
    </div>
  );
};
