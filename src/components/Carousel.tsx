import React, { useEffect, useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  // infinite,
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

  useEffect(() => {
    // Effect logic here
  }, [step, frameSize, itemWidth, animationDuration]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${frameSize * itemWidth}px`,
          height: `${itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: `all ${animationDuration / 1000}s`,
          }}
        >
          {images.map((src, index) => {
            return (
              <li key={index}>
                <img
                  src={src}
                  alt={`Photo ${index}`}
                  width={itemWidth}
                  height={itemWidth}
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
