import React from 'react';
import { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

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
  const currentWidth = itemWidth || 130;
  const currentFrameSize = frameSize || 3;
  const currentStep = step || 3;
  const currentDuration = animationDuration ?? 1000;

  const frameWidth = currentFrameSize * currentWidth;
  const xOffset = position * currentWidth;
  const maxPosition = images.length - currentFrameSize;
  const isPrevDisabled = !infinite && position === 0;
  const isNextDisabled = !infinite && position >= maxPosition;

  const handleNext = () => {
    if (position < maxPosition) {
      setPosition(Math.min(position + currentStep, maxPosition));
    } else if (infinite) {
      setPosition(0);
    }
  };

  const handlePrev = () => {
    if (position > 0) {
      setPosition(Math.max(position - currentStep, 0));
    } else if (infinite) {
      setPosition(maxPosition);
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className={classNames('Carousel__btn', { disabled: isPrevDisabled })}
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        Prev
      </button>

      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${xOffset}px)`,
            transition: `transform ${currentDuration}ms ease-in-out`,
          }}
        >
          {images.map((url, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{
                width: `${currentWidth}px`,
                minWidth: `${currentWidth}px`,
              }}
            >
              <img src={url} alt={`${index + 1}`} width={currentWidth} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-cy="next"
        className={classNames('Carousel__btn', { disabled: isNextDisabled })}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
