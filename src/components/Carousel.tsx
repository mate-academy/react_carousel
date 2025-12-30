import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
};

const safeNumber = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const imagesToShow = safeNumber(frameSize, 1, images.length);
  const imageGap = 24;
  const itemStep = itemWidth + imageGap;
  const maxPosition = Math.max(0, images.length - imagesToShow);
  const safePosition = safeNumber(currentPosition, 0, maxPosition);

  const handlePrevImage = () => {
    setCurrentPosition(prev => safeNumber(prev - step, 0, maxPosition));
  };

  const handleNextImage = () => {
    setCurrentPosition(prev => safeNumber(prev + step, 0, maxPosition));
  };

  const translateX = -safePosition * itemStep;
  const PrevDisabled = safePosition <= 0;
  const NextDisabled = safePosition >= maxPosition;

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
          transition: 'transform 0.3s ease',
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
        >
          {'-->'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
