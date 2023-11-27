import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface ICarouselProps {
  images: string[];
  inputWidth: number;
  frameSize: number
  step: number;
  animationD: number;
  infinite: boolean;
}

const changeSizeByinputWidth = (inputWidth: number) => ({
  width: `${inputWidth * 3}px`,
});

const changeSizeByFrameSize = (frameSize: number, inputWidth: number) => ({
  width: `${inputWidth * frameSize}px`,
});

const Carousel: React.FC<ICarouselProps> = ({
  images,
  inputWidth,
  frameSize,
  step,
  animationD,
  infinite,
}) => {
  const [moveItems, setMoveItems] = useState(0);
  const lastItem = images.length - frameSize;

  const handleMoveRight = () => {
    const remainingItems = images.length - (moveItems + frameSize);

    if (infinite && lastItem <= moveItems) {
      setMoveItems(0);
    } else if (remainingItems > 0) {
      setMoveItems(
        (prevMoveRight) => prevMoveRight + Math.min(step, remainingItems),
      );
    }
  };

  const handleMoveLeft = () => {
    if (infinite && moveItems === 0) {
      setMoveItems(lastItem);
    } else if (moveItems > 0) {
      setMoveItems(
        (prevMoveRight) => prevMoveRight - Math.min(step, prevMoveRight),
      );
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        ...changeSizeByinputWidth(inputWidth),
        ...changeSizeByFrameSize(frameSize, inputWidth),
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => {
          const isVisible = index >= moveItems && index < moveItems + frameSize;

          return (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transition: `transform ${animationD}ms`,
                display: isVisible ? 'block' : 'none',
              }}
            >
              <img
                src={image}
                alt={`${index + 1}`}
                style={{ width: `${inputWidth}px`, height: `${inputWidth}px` }}
                width={inputWidth}
              />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={cn('Carousel__button-prev', {
            'Carousel__button-prev--disabled': moveItems === 0 && !infinite,
          })}
          onClick={handleMoveLeft}
        >
          Prev
        </button>

        <button
          type="button"
          className={cn('Carousel__button-next', {
            'Carousel__button-next--disabled':
              moveItems === images.length - frameSize && !infinite,
          })}
          onClick={handleMoveRight}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
