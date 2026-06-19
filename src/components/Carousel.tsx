import React, { useState } from 'react';
import './Carousel.scss';

import { Image } from '../types/Image';

interface Props {
  images: Image[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);
  const maxPosition = Math.max(0, images.length - frameSize);
  const translateX = -(position * itemWidth);
  const isPrevDisabled = !infinite && position === 0;
  const isNextDisabled = !infinite && position === maxPosition;

  const handlePrev = () => {
    setPosition(prev => {
      const newPosition = prev - step;

      if (newPosition < 0) {
        return infinite ? maxPosition : 0;
      }

      return newPosition;
    });
  };

  const handleNext = () => {
    setPosition(prev => {
      const newPosition = prev + step;

      if (newPosition > maxPosition) {
        return infinite ? 0 : maxPosition;
      }

      return newPosition;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: frameSize * itemWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, idx) => (
            <li key={idx}>
              <img src={img.src} alt={img.alt} width={`${itemWidth}`} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev} disabled={isPrevDisabled}>
        Prev
      </button>
      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
