import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
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

  return (
    <div
      className="Carousel"
      style={{ width: itemWidth * frameSize }}
    >
      <div
        className="Carousel__container"
        style={{
          transform: `translateX(${moveRight}px)`,
          transition: `transform ${animationDuration}ms linear`,
        }}
      >
        <ul className="Carousel__list">
          {images.map(image => (
            <li className="Carousel__list-item" key={image}>
              <img
                style={{ width: itemWidth }}
                src={image}
                alt={image}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="button__container">
        <button
          type="button"
          title="previous images"
          disabled={infinite ? false : moveRight === 0}
          onClick={() => prevImages()}
        >
          Prev
        </button>

        <button
          type="button"
          title="next images"
          data-cy="next"
          disabled={infinite ? false : moveRight === lastPosition}
          onClick={() => nextImages()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
