import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
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

  const handleNext = () => {
    setPosition(prev => {
      const newPos = prev + step;

      if (newPos > maxPosition) {
        return infinite ? 0 : maxPosition;
      }

      return newPos;
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const newPos = prev - step;

      if (newPos < 0) {
        return infinite ? maxPosition : 0;
      }

      return newPos;
    });
  };

  const translateX = -(position * itemWidth);

  const isPrevDisabled = !infinite && position === 0;
  const isNextDisabled = !infinite && position === maxPosition;

  return (
    <div className="Carousel">
      <button type="button" onClick={handlePrev} disabled={isPrevDisabled}>
        Prev
      </button>

      <div
        className="Carousel__frame"
        style={{
          width: frameSize * itemWidth,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img src={image} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleNext}
        data-cy="next"
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
