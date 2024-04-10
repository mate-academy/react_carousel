import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState<number>(0);

  const handlePrevClick = () => {
    if (position < 0) {
      setPosition(position + itemWidth * step);
    }
  };

  const handleNextClick = () => {
    if (position > -((images.length - step) * itemWidth)) {
      setPosition(position - itemWidth * step);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__wrapper">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position}px)`,
            animation: `${animationDuration / 1000}s ease-in ${infinite && 'infinite'}`,
          }}
        >
          {images.map((src, index) => {
            return (
              <li key={index}>
                <img
                  src={src}
                  alt={`${index}`}
                  width={130}
                  height={130}
                  className="Carousel__images"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="button">
        <button
          type="button"
          className="button__prev"
          disabled={position >= 0}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          type="button"
          className="button__next"
          data-cy="next"
          disabled={position <= -((images.length - step) * itemWidth)}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};
