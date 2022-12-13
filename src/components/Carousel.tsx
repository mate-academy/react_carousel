import React, { useState } from 'react';
import './Carousel.scss';

export type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animation: number,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animation,
}) => {
  const [offset, setOffset] = useState(0);

  const containerWidth = itemWidth * frameSize;

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      return Math.min(currentOffset + step * itemWidth, 0);
    });
  };

  const maxOffset = -(images.length - frameSize) * itemWidth;

  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      return Math.max(currentOffset - step * itemWidth, maxOffset);
    });
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${containerWidth}px`,
          height: `${itemWidth}px`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={`${index + 1}`}
              className="Carousel__image"
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                transform: `translateX(${offset}px)`,
                transition: `${animation}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__button-container">
        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          disabled={offset === 0}
          onClick={handleLeftArrowClick}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button Carousel__button--next"
          data-cy="next"
          disabled={offset === maxOffset}
          onClick={handleRightArrowClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
