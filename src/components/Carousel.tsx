import React, { useState, useRef } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);

  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    if (currentIndex >= maxIndex && !infinite) {
      return;
    }

    const newIndex = infinite
      ? (currentIndex + step) % images.length
      : Math.min(currentIndex + step, maxIndex);

    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    if (currentIndex <= 0 && !infinite) {
      return;
    }

    const newIndex = infinite
      ? (currentIndex - step + images.length) % images.length
      : Math.max(currentIndex - step, 0);

    setCurrentIndex(newIndex);
  };

  const translateX = -(currentIndex * itemWidth);

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          ref={containerRef}
          style={{
            width: `${images.length * itemWidth}px`,
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, index) => (
            <li
              key={src}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={src}
                alt={`img-${index}`}
                style={{ width: `${itemWidth}px`, height: 'auto' }}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`Carousel__button Carousel__button--prev ${!infinite && currentIndex <= 0 ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={!infinite && currentIndex <= 0}
      >
        ←
      </button>

      <button
        type="button"
        className={`Carousel__button Carousel__button--next ${!infinite && currentIndex >= maxIndex ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={!infinite && currentIndex >= maxIndex}
        data-cy="next"
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
