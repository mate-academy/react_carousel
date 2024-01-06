import React, { useEffect, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC <Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);
  const listSize = itemWidth * images.length;
  const lastPosition = -(images.length - frameSize);
  const carouselWidth = frameSize * itemWidth;
  const isNextDisabled = position === lastPosition && !infinite;
  const isPrevDisabled = position === 0 && !infinite;

  const prevImage = () => {
    if (position < 0) {
      setPosition((prevPosition => (
        prevPosition + step < 0
          ? prevPosition + step
          : 0
      )));

      return;
    }

    setPosition(lastPosition);
  };

  const nextImage = () => {
    if (position > lastPosition) {
      setPosition((prevPosition => (
        prevPosition - step > lastPosition
          ? prevPosition - step
          : lastPosition
      )));

      return;
    }

    setPosition(0);
  };

  useEffect(() => setPosition(0), [frameSize]);

  return (
    <div
      className="Carousel"
      style={{
        width: `${carouselWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
          width: listSize,
        }}
      >
        {images.map((image) => (
          <li
            key={image}
            className="Carousel__link"
            style={{
              width: itemWidth,
            }}
          >
            <img
              className="Carousel__img"
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={prevImage}
          disabled={isPrevDisabled}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          onClick={nextImage}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
