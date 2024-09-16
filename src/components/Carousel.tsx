import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);
  const lastPosition = -(images.length - frameSize);
  const nextDisabled = position === lastPosition && !infinite;
  const prevDisabled = position === 0 && !infinite;

  const listStyles = {
    transform: `translateX(${position * itemWidth}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const handlePrev = () => {
    const newPosition =
      position < 0 ? Math.min(position + step, 0) : lastPosition;

    setPosition(newPosition);
  };

  const handleNext = () => {
    const newPosition =
      position === lastPosition ? 0 : Math.max(position - step, lastPosition);

    setPosition(newPosition);
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize - 1}px` }}
    >
      <ul className="Carousel__list" style={listStyles}>
        {images.map(image => (
          <li key={image}>
            <img
              className="Carousel__image"
              src={image}
              alt={image}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        className="Carousel__prev-button"
        type="button"
        onClick={handlePrev}
        disabled={prevDisabled}
      >
        Prev
      </button>

      <button
        type="button"
        className="Carousel__next-button"
        data-cy="next"
        onClick={handleNext}
        disabled={nextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
