import cn from 'classnames';
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
  const padding = 16;
  const [currentPosition, setCurrentPosition] = useState(0);

  const stepOffSet = itemWidth + padding;
  const visibleFrame = stepOffSet * frameSize;
  const totalItemsWidth = images.length * stepOffSet;
  const maxOffset = Math.max(0, totalItemsWidth - visibleFrame);

  const move = step * stepOffSet;

  const moveForward = () => {
    setCurrentPosition(current => {
      const next = current - move;
      const maxMove = -(images.length * stepOffSet - frameSize * stepOffSet);

      if (infinite && Math.abs(next) > Math.abs(maxMove)) {
        setTimeout(() => {
          setCurrentPosition(0);
        }, animationDuration);

        return next;
      }

      return next < maxMove ? maxMove : next;
    });
  };

  const moveBack = () => {
    setCurrentPosition(current => {
      const next = current + move;

      if (infinite && next > 0) {
        return -maxOffset;
      }

      return next > 0 ? 0 : next;
    });
  };

  const isDisabledForMoveForward =
    !infinite && Math.abs(currentPosition) + move > maxOffset;

  const isDisabledForMoveBack = currentPosition >= 0;

  return (
    <div className="Carousel">
      <button
        aria-label="Move carousel left"
        type="button"
        className={cn('Carousel__button', 'btn', {
          'Carousel__button--disabled': isDisabledForMoveBack,
        })}
        onClick={moveBack}
        disabled={isDisabledForMoveBack}
      >
        {'❮'}
      </button>

      <div
        className="Carousel__wrapper"
        style={{
          width: visibleFrame,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${currentPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li className="Carousel__item" key={`${image}-${index}`}>
                <img
                  className="Carousel__image"
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        aria-label="Move carousel right"
        type="button"
        data-cy="next"
        className={cn('Carousel__button', 'btn', {
          'Carousel__button--disabled': isDisabledForMoveForward,
        })}
        disabled={isDisabledForMoveForward}
        onClick={moveForward}
      >
        {'❯'}
      </button>
    </div>
  );
};

export default Carousel;
