import React from 'react';
import cn from 'classnames';

import './Carousel.scss';
import { CarouselProps } from '../types/CarouselProps';

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentPosition, setCurrentPosition] = React.useState(0);

  const handleNext = () => {
    setCurrentPosition(prev => {
      const maxPosition = images.length - frameSize;

      if (!infinite && prev + step > maxPosition) {
        return maxPosition;
      }

      if (infinite && prev + step >= images.length) {
        return 0;
      }

      return prev + step;
    });
  };

  const handlePrev = () => {
    setCurrentPosition(prev => {
      if (!infinite && prev - step < 0) {
        return 0;
      }

      if (infinite && prev - step < 0) {
        return images.length - frameSize;
      }

      return prev - step;
    });
  };

  const visibleFrameWidth = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <button
        type="button"
        className={cn('Carousel_button prev', {
          disabled: !infinite && currentPosition === 0,
        })}
        onClick={handlePrev}
      >
        ‹
      </button>

      <div
        className="Carousel_viewport"
        style={{ width: `${visibleFrameWidth}px` }}
      >
        <ul
          className="Carousel_list"
          style={{
            transform: `translateX(-${currentPosition * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel_item"
              style={{ width: `${itemWidth}px` }}
              data-cy="carousel-item"
            >
              <img src={image} alt={`Slide ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className={cn('Carousel_button next', {
          disabled: !infinite && currentPosition + frameSize >= images.length,
        })}
        onClick={handleNext}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
