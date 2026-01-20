import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = images.length;
  const visibleCount = frameSize;
  const lastStart = Math.max(0, total - visibleCount);

  const clampIndex = (index: number) => {
    if (!infinite) {
      return Math.min(Math.max(index, 0), lastStart);
    }

    if (total === 0) {
      return 0;
    }

    return ((index % total) + total) % total;
  };

  const canGoPrev = infinite || currentIndex > 0;
  const canGoNext = infinite || currentIndex < lastStart;

  const handlePrev = () => {
    if (!canGoPrev) {
      return;
    }

    setCurrentIndex(prev => {
      let stepValue = step;

      if (!infinite && prev < step) {
        stepValue = prev;
      }

      const nextIndex = prev - stepValue;

      return clampIndex(nextIndex);
    });
  };

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }

    setCurrentIndex(prev => {
      let stepValue = step;

      if (!infinite && prev + step > lastStart) {
        stepValue = lastStart - prev;
      }

      const nextIndex = prev + stepValue;

      return clampIndex(nextIndex);
    });
  };

  const offset = -(currentIndex * (itemWidth + 10));

  const viewportStyle: React.CSSProperties = {
    width: frameSize * itemWidth + (frameSize - 1) * 10,
    height: itemWidth + 10,
  };

  const imageStyle: React.CSSProperties = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const listStyle: React.CSSProperties = {
    transform: `translateX(${offset}px)`,
    transition: `transform ${animationDuration}ms ease`,
    width: `calc(${total} * ${itemWidth}px + ${total - 1} * 10px)`,
  };

  return (
    <div className="Carousel">
      <button
        id="btn-prev"
        type="button"
        className={`Carousel__arrow Carousel__arrow--prev ${!canGoPrev ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={!canGoPrev}
      >
        <span aria-hidden="true">‹</span>
        <span className="sr-only">Previous</span>
      </button>

      <div className="Carousel__viewport" style={viewportStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((src, index) => (
            <li key={src + index} data-cy="item">
              <img
                data-cy="image"
                src={src}
                alt={String(index + 1)}
                style={imageStyle}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        id="btn-next"
        type="button"
        className={`Carousel__arrow Carousel__arrow--next ${!canGoNext ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={!canGoNext}
        data-cy="next"
      >
        <span aria-hidden="true">›</span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
