import React, { useState } from 'react';
import './Carousel.scss';

export interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setIndex] = useState(0);
  const totalItems = images.length;
  const maxIndex = Math.max(0, totalItems - frameSize);

  const handleNext = () => {
    setIndex((prevIndex: number) => {
      const nextIndex = prevIndex + step;

      if (nextIndex > maxIndex) {
        return infinite ? 0 : maxIndex;
      }

      return nextIndex;
    });
  };

  const handlePrev = () => {
    setIndex((prevIndex: number) => {
      const prev = prevIndex - step;

      if (prev < 0) {
        return infinite ? maxIndex : 0;
      }

      return prev;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
            width: `${totalItems * itemWidth}px`,
          }}
        >
          {images.map((src, index) => (
            <li
              key={index}
              style={{ width: `${itemWidth}px` }}
              className="Carousel__item"
            >
              <img src={src} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className={`button button__prev ${!infinite && currentIndex === 0 ? 'disabled' : ''}`}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={handleNext}
        data-cy="next"
        className={`button button__next ${!infinite && currentIndex >= maxIndex ? 'disabled' : ''}`}
        disabled={!infinite && currentIndex >= maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
