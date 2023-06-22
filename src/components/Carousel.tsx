import React, { useState } from 'react';
import './Carousel.scss';

interface Prop {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
}

const Carousel: React.FC<Prop> = (
  {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  },
) => {
  const [x, setX] = useState(0);
  const maxIndex = -(images.length - frameSize);
  const nextHandler = () => {
    const currentIndex = Math.max(x - step, maxIndex);

    setX(infinite && currentIndex === maxIndex
      ? 0
      : currentIndex);
  };

  const prevHandler = () => {
    const currentIndex = Math.min(x + step, 0);

    setX(infinite && currentIndex === 0
      ? maxIndex
      : currentIndex);
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
      >
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${x * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              width={itemWidth}
              src={image}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={prevHandler}
        disabled={!infinite && x === 0}
      >
        Prev
      </button>

      <button
        type="button"
        onClick={nextHandler}
        disabled={!infinite && x === maxIndex}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
