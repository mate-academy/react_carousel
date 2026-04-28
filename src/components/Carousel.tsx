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
  const [currentOffset, setCurrentOffset] = useState(0);

  const maxOffset = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setCurrentOffset(prev => {
      const nextValue = prev + step;

      if (nextValue > maxOffset) {
        return infinite ? 0 : maxOffset;
      }

      return nextValue;
    });
  };

  const handlePrev = () => {
    setCurrentOffset(prev => {
      const nextValue = prev - step;

      if (nextValue < 0) {
        return infinite ? maxOffset : 0;
      }

      return nextValue;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: itemWidth * frameSize,
          overflow: 'hidden',
          boxSizing: 'content-box',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentOffset * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((url, index) => (
            <li
              key={index}
              style={{ width: itemWidth, minWidth: itemWidth, flexShrink: 0 }}
            >
              <img src={url} alt={`Slice ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        disabled={!infinite && currentOffset === 0}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={handleNext}
        data-cy="next"
        disabled={!infinite && currentOffset === maxOffset}
      >
        Next
      </button>
    </div>
  );
};
