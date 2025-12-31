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

const safeNumber = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const wrapNumber = (value: number, min: number, max: number) => {
  if (max <= min) {
    return min;
  }

  const range = max - min + 1;
  const normalized = (((value - min) % range) + range) % range;

  return min + normalized;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const imagesToShow = safeNumber(frameSize, 1, images.length);
  const imageGap = 24;
  const itemStep = itemWidth + imageGap;
  const maxPosition = Math.max(0, images.length - imagesToShow);
  const safePosition = safeNumber(currentPosition, 0, maxPosition);
  const safeAnimationDuration = safeNumber(animationDuration, 0, 10000);

  const handlePrevImage = () => {
    setCurrentPosition(prev => {
      const next = prev - step;

      return infinite
        ? wrapNumber(next, 0, maxPosition)
        : safeNumber(next, 0, maxPosition);
    });
  };

  const handleNextImage = () => {
    setCurrentPosition(prev => {
      const next = prev + step;

      return infinite
        ? wrapNumber(next, 0, maxPosition)
        : safeNumber(next, 0, maxPosition);
    });
  };

  const translateX = -safePosition * itemStep;
  const cannotScroll = maxPosition <= 0;
  const PrevDisabled = infinite ? cannotScroll : safePosition <= 0;
  const NextDisabled = infinite ? cannotScroll : safePosition >= maxPosition;

  return (
    <div
      className={`Carousel${imagesToShow === 1 ? ' Carousel--single' : ''}`}
      style={
        {
          ['--carousel-item-width']: `${itemWidth}px`,
          ['--carousel-gap']: `${imageGap}px`,
          ['--carousel-frame-size']: `${imagesToShow}`,
        } as React.CSSProperties
      }
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: `transform ${safeAnimationDuration}ms ease`,
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
          type="button"
          onClick={handlePrevImage}
          disabled={PrevDisabled}
        >
          {'<--'}
        </button>
        <button
          className="Carousel__button Carousel__button--next"
          type="button"
          onClick={handleNextImage}
          disabled={NextDisabled}
          data-cy="next"
        >
          {'-->'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
