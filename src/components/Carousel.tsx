import React, { useState } from 'react';
import './Carousel.scss';

import { State } from '../App';

enum Direction {
  Left = 'left',
  Right = 'right',
}

const Carousel: React.FC<State> = state => {
  const { images, itemWidth, frameSize, step, animationDuration, infinite } =
    state;

  const carouselWidth = frameSize * itemWidth;
  const [pos, setPos] = useState(0);

  const preparedImages = images.map((image, i) => ({
    src: image,
    id: i + 1,
  }));

  const fullLength = itemWidth * images.length;
  const scrollStep = itemWidth * step;
  const lastSlidePos = fullLength - itemWidth * frameSize;

  const handleClick = (direction: Direction) => {
    setPos(prevPos => {
      const delta = direction === Direction.Left ? -scrollStep : scrollStep;

      if (direction === Direction.Left && infinite && prevPos === 0) {
        return lastSlidePos;
      }

      if (
        direction === Direction.Right &&
        infinite &&
        prevPos === lastSlidePos
      ) {
        return 0;
      }

      return Math.max(0, Math.min(prevPos + delta, lastSlidePos));
    });
  };

  return (
    <div className="Carousel">
      <button
        className="Carousel__button Carousel__button--left"
        type="button"
        onClick={() => handleClick(Direction.Left)}
        disabled={pos === 0 && !infinite}
      ></button>

      <div
        className="Carousel__container"
        style={{
          maxWidth: `${carouselWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-pos}px)`,
            transition: `all ${animationDuration}ms`,
          }}
        >
          {preparedImages.map(image => (
            <li key={image.id}>
              <img
                className="Carousel__img"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
                src={image.src}
                alt={`Image ${image.id}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button Carousel__button--right"
        type="button"
        onClick={() => handleClick(Direction.Right)}
        disabled={pos === lastSlidePos && !infinite}
        data-cy="next"
      ></button>
    </div>
  );
};

export default Carousel;
