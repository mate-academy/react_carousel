import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = (
  {
    images, step, itemWidth, frameSize, animationDuration, infinite,
  },
) => {
  const [position, setPosition] = useState(0);
  const lastPosition = images.length - frameSize;

  useEffect(() => {
    setPosition(0);
  }, [frameSize]);

  const handleNextClick = () => {
    setPosition(position + step < lastPosition
      ? position + step
      : lastPosition);

    if (infinite && position === lastPosition) {
      setPosition(0);
    }
  };

  const handlePrevClick = () => {
    setPosition(position - step < 0 ? 0 : position - step);

    if (infinite && position === 0) {
      setPosition(lastPosition);
    }
  };

  return (
    <div
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
      className="Carousel"
    >
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${-position * itemWidth}px)`,
              transition: `transform ease ${animationDuration / 1000}s`,
            }}
          >
            <img style={{ width: `${itemWidth}px` }} src={image} alt="1" />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="button__prev"
          onClick={handlePrevClick}
          disabled={position === 0 && !infinite}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          className="button__next"
          onClick={handleNextClick}
          disabled={position === lastPosition && !infinite}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Carousel;
