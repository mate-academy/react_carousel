import React, { useState } from 'react';
import { Props } from '../../types/Types';
import './Carousel.scss';

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const isLastPosition = images.length - frameSize;
  const isPrevDisabled = (infinite && frameSize === images.length)
    || (position === 0 && !infinite);
  const isNextDisabled = (infinite && frameSize === images.length)
    || (position === isLastPosition && !infinite);

  const handleButtonNext = () => {
    if (position + step < isLastPosition) {
      setPosition(position + step);
    } else {
      setPosition(isLastPosition);
    }

    if (infinite && position === isLastPosition) {
      setPosition(0);
    }
  };

  const handleButtonPrev = () => {
    if (position - step > 0) {
      setPosition(position - step);
    } else {
      setPosition(0);
    }

    if (infinite && position === 0) {
      setPosition(isLastPosition);
    }
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize}px` }}
    >
      <ul className="Carousel__list">
        {images.map((image) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${-position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handleButtonPrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={handleButtonNext}
          disabled={isNextDisabled}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
