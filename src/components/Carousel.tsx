import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselSettings } from '../types/CarouselSettings';

interface Props extends CarouselSettings {
  images: string[];
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;
  const handleNext = () => {
    setCurrentIndex(prev => {
      if (infinite) {
        if (prev + step > maxIndex) {
          return 0;
        }

        return prev + step;
      }

      return Math.min(prev + step, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      if (infinite) {
        if (prev - step < 0) {
          return maxIndex;
        }
      }

      return Math.max(prev - step, 0);
    });
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className="Carousel__button"
          onClick={handleNext}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
