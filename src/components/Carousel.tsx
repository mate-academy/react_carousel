import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

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

      return Math.min(images.length - frameSize, prevIndex + step);
    });
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth}px` }}
      data-cy="frame"
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((url, index) => (
          <li key={url} style={{ width: `${itemWidth}px` }} data-cy="card">
            <img
              src={url}
              alt={`Slide ${index}`}
              width={itemWidth}
              style={{ width: `${itemWidth}px` }}
              data-cy="image"
            />
          </li>
        ))}
      </ul>

      <button type="button" data-cy="prev" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
