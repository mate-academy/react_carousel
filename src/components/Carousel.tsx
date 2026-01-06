import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const safe = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const wrap = (value: number, min: number, max: number) => {
  if (max <= min) {
    return min;
  }

  const range = max - min + 1;

  return min + ((((value - min) % range) + range) % range);
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const gap = 24;
  const safeFrame = safe(frameSize, 1, images.length);
  const safeStep = safe(step, 1, images.length);
  const safeDuration = safe(animationDuration, 0, 10000);

  const maxPosition = Math.max(0, images.length - safeFrame);
  const itemStep = itemWidth + gap;

  const handleNext = () => {
    setPosition(prev =>
      infinite
        ? wrap(prev + safeStep, 0, maxPosition)
        : safe(prev + safeStep, 0, maxPosition),
    );
  };

  const handlePrev = () => {
    setPosition(prev =>
      infinite
        ? wrap(prev - safeStep, 0, maxPosition)
        : safe(prev - safeStep, 0, maxPosition),
    );
  };

  const translateX = -position * itemStep;

  return (
    <div
      className="Carousel"
      style={
        {
          ['--carousel-item-width']: `${itemWidth}px`,
          ['--carousel-gap']: `${gap}px`,
          ['--carousel-frame-size']: safeFrame,
        } as React.CSSProperties
      }
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: `transform ${safeDuration}ms ease`,
        }}
      >
        {images.map((src, index) => (
          <li key={src}>
            <img src={src} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          className="Carousel__button Carousel__button--prev"
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          className="Carousel__button Carousel__button--next"
          onClick={handleNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
