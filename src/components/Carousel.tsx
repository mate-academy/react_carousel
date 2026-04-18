import React, { useState } from 'react';
import './Carousel.scss';

import { CarouselProps } from '../types/types';

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  animationDuration = 1000,
  infinite = false,
  step = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, images.length - frameSize);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (infinite && prevIndex === 0) {
        return maxIndex;
      }

      return Math.max(0, prevIndex - step);
    });
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      if (infinite && prevIndex >= maxIndex) {
        return 0;
      }

      return Math.min(maxIndex, prevIndex + step);
    });
  };

  return (
    <div className="Carousel">
      <div style={{ width: `${frameSize * itemWidth}px`, overflow: 'hidden' }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li
                key={image}
                style={{ width: `${itemWidth}px`, flexShrink: 0 }}
              >
                <img src={image} alt={`Image ${index + 1}`} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
