import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const maxOffset = (images.length - frameSize) * itemWidth;

  useEffect(() => {
    setOffset(0);
  }, [images, frameSize, itemWidth]);

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setOffset(prev => {
      if (infinite && prev === 0) {
        return maxOffset;
      }

      return Math.max(0, prev - step * itemWidth);
    });

    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const handleNext = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setOffset(prev => {
      if (infinite && prev >= maxOffset) {
        return 0;
      }

      return Math.min(maxOffset, prev + step * itemWidth);
    });

    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const isPrevDisabled = !infinite && offset === 0;
  const isNextDisabled = !infinite && offset >= maxOffset;

  return (
    <div className="carousel">
      <div
        className="carousel__frame"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          ref={listRef}
          className="carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((src, index) => (
            <li key={src} className="carousel__item">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
                className="carousel__image"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="carousel__controls">
        <button
          className="carousel__btn carousel__btn--prev"
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          &#8249;
        </button>

        <button
          data-cy="next"
          className="carousel__btn carousel__btn--next"
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
