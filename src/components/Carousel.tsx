import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(1);

  const lastPosition = images.length - frameSize + 1;
  const firstPosition = 1;

  // setting the position of images after frameSize change
  if (position > lastPosition) {
    setPosition(lastPosition);
  }

  const handleNext = (): void => {
    if (!infinite) {
      if ((position + step) >= lastPosition) {
        setPosition(lastPosition);

        return;
      }

      setPosition(position + step);
    } else {
      if (position === lastPosition) {
        setPosition(firstPosition);

        return;
      }

      if ((position + step) > lastPosition) {
        setPosition(lastPosition);

        return;
      }

      setPosition(position + step);
    }
  };

  const handlePrev = (): void => {
    if (!infinite) {
      if ((position - step) <= 1) {
        setPosition(1);

        return;
      }

      setPosition(position - step);
    } else {
      if (position === 1) {
        setPosition(lastPosition);

        return;
      }

      if ((position - step) < 1) {
        setPosition(1);

        return;
      }

      setPosition(position - step);
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className={
          `Carousel__button ${firstPosition === position && !infinite
            ? 'Carousel__button--disabled' : ''}`
        }
        onClick={handlePrev}
      >
        &lt;
      </button>

      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        {images.map(
          (image) => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transform: `translateX(${(-position + 1) * (itemWidth)}px)`,
                transition: `transform ${animationDuration}ms ease`,
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={image}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ),
        )}
      </ul>

      <button
        data-cy="next"
        type="button"
        className={
          `Carousel__button ${lastPosition === position && !infinite
            ? 'Carousel__button--disabled' : ''}`
        }
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};
