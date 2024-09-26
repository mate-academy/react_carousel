import React, { useState } from 'react';
import './Carousel.scss';

export type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const maxOffset = itemWidth * (images.length - frameSize);

  const handleNext = () => {
    setCurrentOffset(prevOffset => {
      const newOffset = prevOffset + itemWidth * step;

      if (newOffset > maxOffset && currentOffset < maxOffset) {
        return maxOffset;
      } else if (newOffset > maxOffset) {
        return infinite ? 0 : maxOffset;
      }

      return newOffset;
    });
  };

  const handlePrev = () => {
    setCurrentOffset(prevOffset => {
      const newOffset = prevOffset - itemWidth * step;

      if (newOffset < 0 && currentOffset > 0) {
        return 0;
      } else if (newOffset < 0) {
        return infinite ? maxOffset : 0;
      }

      return newOffset;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `${animationDuration}ms`,
            transform: `translateX(-${currentOffset}px)`,
          }}
        >
          {images.map((image, index) => (
            <li className="Carousel__item" key={index}>
              <img
                className="Carousel__img"
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__button-group">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          disabled={!infinite && currentOffset === 0}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          disabled={!infinite && currentOffset >= maxOffset}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};
