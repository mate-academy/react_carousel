import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const maxIndex = Math.max(0, images.length - frameSize);
      const nextIndex = prevIndex + step;

      if (infinite) {
        return nextIndex > maxIndex ? 0 : nextIndex;
      }

      return Math.min(nextIndex, maxIndex);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const maxIndex = Math.max(0, images.length - frameSize);
      const prevIndexValue = prevIndex - step;

      if (infinite) {
        return prevIndexValue < 0 ? maxIndex : prevIndexValue;
      }

      return Math.max(prevIndexValue, 0);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  const offset = -currentIndex * itemWidth;
  const frameWidth = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: `${frameWidth}px`, height: `${itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transition: isAnimating
              ? `transform ${animationDuration}ms ease-in-out`
              : 'none',
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            >
              <img src={image} alt={`carousel-${index}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <button type="button" onClick={handlePrev} className="Carousel__button">
          Prev
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="Carousel__button"
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
