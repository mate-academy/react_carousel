import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  imagesNumbers: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  imagesNumbers: images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [moveRight, getMoveRight] = useState(0);

  const lastPosition: number = itemWidth * (images.length - frameSize) * -1;

  function prevImages() {
    if (moveRight === 0) {
      return infinite ? getMoveRight(lastPosition) : getMoveRight(0);
    }

    if (moveRight + (step * itemWidth) > 0) {
      return getMoveRight(0);
    }

    return getMoveRight(moveRight + (step * itemWidth));
  }

  function nextImages() {
    if (moveRight === lastPosition) {
      return infinite ? getMoveRight(0) : getMoveRight(lastPosition);
    }

    if (moveRight - (step * itemWidth) < lastPosition) {
      return getMoveRight(lastPosition);
    }

    return getMoveRight(moveRight - (step * itemWidth));
  }

  const timer = window.setInterval(() => {
    clearInterval(timer);

    if (moveRight === lastPosition && !infinite) {
      return;
    }

    nextImages();
  }, animationDuration);

  return (
    <div
      className="Carousel"
      style={{ width: itemWidth * frameSize }}
    >
      <div
        className="Carousel__container"
        style={{ transform: `translateX(${moveRight}px)` }}
      >
        <ul className="Carousel__list">
          {images.map(imagesNumber => (
            <li className="Carousel__list-item" key={imagesNumber}>
              <img
                style={{ width: itemWidth }}
                src={`./img/${imagesNumber}.png`}
                alt={imagesNumber}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="button__container">
        <button
          type="button"
          disabled={infinite ? false : moveRight === 0}
          onClick={() => {
            clearInterval(timer);
            prevImages();
          }}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          disabled={infinite ? false : moveRight === lastPosition}
          onClick={() => {
            clearInterval(timer);
            nextImages();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
