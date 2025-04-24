import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../types/CarouselProps';

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);
  const maxPosition = images.length - frameSize;

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        overflow: 'hidden',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: `${images.length * itemWidth}px`,
          transform: `translateX(-${position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map(image => {
          return (
            <li
              key={image}
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img src={image} alt={image} width={itemWidth} />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        data-cy="prev"
        onClick={() =>
          setPosition(prev => {
            const next = prev - step;

            if (next < 0) {
              return infinite ? maxPosition : 0;
            }

            return next;
          })
        }
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() =>
          setPosition(prev => {
            const next = prev + step;

            if (next > maxPosition) {
              return infinite ? 0 : maxPosition;
            }

            return next;
          })
        }
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
