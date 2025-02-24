import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);
  const maxPosition = (images.length - frameSize) * itemWidth;

  const handleNext = () => {
    setPosition(prev => {
      const newPosition = prev + step * itemWidth;

      if (infinite) {
        return newPosition > maxPosition ? 0 : newPosition;
      }

      return Math.min(newPosition, maxPosition);
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const newPosition = prev - step * itemWidth;

      if (infinite) {
        return newPosition < 0 ? maxPosition : newPosition;
      }

      return Math.max(newPosition, 0);
    });
  };

  const startIndex = Math.floor(position / itemWidth);
  const endIndex = startIndex + frameSize;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${frameSize * itemWidth}px`,
          height: `${itemWidth}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            width: `${images.length * itemWidth}px`,
            transition: `transform ${animationDuration}ms ease-in-out`,
            transform: `translateX(-${position}px)`,
          }}
        >
          {images.map((image, index) => {
            const isVisible = index >= startIndex && index < endIndex;

            return (
              <li
                key={index}
                style={{
                  width: `${itemWidth}px`,
                  flexShrink: 0,
                  display: isVisible ? 'block' : 'none',
                }}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  width={itemWidth}
                  style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};
