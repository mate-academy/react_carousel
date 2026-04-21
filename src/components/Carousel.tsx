import React, { useState } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;
  const maxIndex = Math.max(0, totalImages - frameSize);

  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextValue = prev + step;

      if (nextValue > maxIndex) {
        return infinite ? 0 : maxIndex;
      }

      return nextValue;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextValue = prev - step;

      if (nextValue < 0) {
        return infinite ? maxIndex : 0;
      }

      return nextValue;
    });
  };

  const containerWidth = itemWidth * frameSize;
  const trackTransform = `translateX(-${currentIndex * itemWidth}px)`;

  return (
    <div className="carousel">
      <div className="carousel__buttons">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          Next
        </button>
      </div>

      <div
        className="carousel__frame"
        style={{
          width: `${containerWidth}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ul
          className="carousel__track"
          style={{
            display: 'flex',
            padding: 0,
            margin: 0,
            listStyle: 'none',
            transform: trackTransform,
            transition: `transform ${animationDuration}ms ease-in-out`,
            width: `${itemWidth * images.length}px`,
          }}
        >
          {images.map((url, index) => (
            <li
              key={`${url}-${index}`}
              className="carousel__item"
              style={{
                width: `${itemWidth}px`,
                minWidth: `${itemWidth}px`,
                overflow: 'hidden',
                listStyle: 'none',
              }}
            >
              <img
                src={url}
                alt={`Slide ${index}`}
                className="carousel__img"
                width={itemWidth}
                style={{ display: 'block', width: '100%' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
