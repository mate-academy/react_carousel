/* eslint-disable prettier/prettier */
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

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = images.length - frameSize;

  const handlePrev = () => {
    if (infinite && position === 0) {
      setPosition(maxPosition);

      return;
    }

    setPosition(Math.max(0, position - step));
  };

  const handleNext = () => {
    if (infinite && position >= maxPosition) {
      setPosition(0);

      return;
    }

    setPosition(Math.min(maxPosition, position + step));
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${position * itemWidth}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map(image => (
          <li key={image}>
            <img src={image} alt={image} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>

      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
