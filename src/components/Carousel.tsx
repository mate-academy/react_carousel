import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
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
  const [position, setPosition] = useState(0);
  const maxPosition = images.length - frameSize;

  const scrollTo = (target: number) => {
    if (infinite) {
      const wrapped =
        target < 0 ? maxPosition : target > maxPosition ? 0 : target;

      setPosition(wrapped);
    } else {
      setPosition(Math.max(0, Math.min(target, maxPosition)));
    }
  };

  const handlePrev = () => scrollTo(position - step);
  const handleNext = () => scrollTo(position + step);

  const isAtStart = position === 0;
  const isAtEnd = position >= maxPosition;
  const isPrevDisabled = !infinite && isAtStart;
  const isNextDisabled = !infinite && isAtEnd;

  return (
    <div
      className="carousel"
      style={{
        maxWidth: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="carousel__list"
        style={{
          transform: `translateX(-${position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={index}
            className="carousel__item"
            style={{ width: `${itemWidth}px`, flexShrink: 0 }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              width={itemWidth}
              style={{ width: `${itemWidth}px`, height: 'auto' }}
              loading="lazy"
            />
          </li>
        ))}
      </ul>

      <div className="carousel__controls">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className="carousel__btn"
          aria-label="Previous slide"
          data-cy="prev"
        >
          Prev
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          className="carousel__btn"
          aria-label="Next slide"
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
