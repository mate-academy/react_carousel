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

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, images.length - frameSize);

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - step;

      if (infinite && nextIndex < 0) {
        return maxIndex;
      }

      return Math.max(0, nextIndex);
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + step;

      if (infinite && nextIndex > maxIndex) {
        return 0;
      }

      return Math.min(maxIndex, nextIndex);
    });
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= maxIndex;

  const frameWidth = frameSize * itemWidth;
  const listTransform = -currentIndex * itemWidth;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: frameWidth, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            transform: `translateX(${listTransform}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((url, index) => (
            <li
              key={index}
              style={{
                width: `${itemWidth}px`,
                flexShrink: 0,
              }}
            >
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                width={itemWidth} // Додаємо атрибут width прямо на img
                style={{ display: 'block' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev} disabled={isPrevDisabled}>
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
