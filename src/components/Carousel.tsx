import React from 'react';
import './Carousel.scss';
import { moveCarouselItemToPosition, MAX_ITEM_WIDTH } from '../utils';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  let currentPositon = 0;

  const itemWidthWithGap = itemWidth + itemWidth * 0.1;
  const positionStep = itemWidthWithGap * step;
  const minPosition = -(itemWidthWithGap * (images.length - frameSize));
  const maxPosition = 0;

  const eventHandlerNext = () => {
    let newPosition = currentPositon - positionStep;

    if (newPosition < minPosition) {
      if (infinite && currentPositon === minPosition) {
        newPosition = maxPosition;
      } else {
        newPosition = minPosition;
      }
    }

    if (newPosition !== currentPositon) {
      currentPositon = newPosition;
      moveCarouselItemToPosition(currentPositon);
    }
  };

  const eventHandlerPrev = () => {
    let newPosition = currentPositon + positionStep;

    if (newPosition > maxPosition) {
      if (infinite && currentPositon === maxPosition) {
        newPosition = minPosition;
      } else {
        newPosition = maxPosition;
      }
    }

    if (newPosition !== currentPositon) {
      currentPositon = newPosition;
      moveCarouselItemToPosition(currentPositon);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        height: `${MAX_ITEM_WIDTH + 32 + 40}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: `${(itemWidth * frameSize) + ((frameSize - 1) * (itemWidth * 0.1))}px`,
          gap: `${itemWidth * 0.1}px`,
        }}
      >
        {images.map((imageURL, index) => (
          <li
            className="Carousel__item"
            key={imageURL}
            style={{
              width: `${itemWidth}px`,
              height: `${itemWidth}px`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              src={imageURL}
              alt={`${index}`}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons-container">
        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          onClick={eventHandlerPrev}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button Carousel__button--next"
          data-cy="next"
          onClick={eventHandlerNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
