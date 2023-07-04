import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
}
export const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const gap = 0;
  const fullWidth = itemWidth + gap;
  const [currentPosition, setCurrentPosition] = useState(0);

  const scrollCarousel = (isNext: boolean) => {
    setCurrentPosition(prevPosition => {
      const nextPosition = isNext ? prevPosition + step : prevPosition - step;
      const maxPosition = images.length - frameSize;

      if (nextPosition < 0) {
        return 0;
      }

      if (nextPosition > maxPosition) {
        return maxPosition;
      }

      return nextPosition;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${fullWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentPosition * fullWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
            gap: `${gap}px`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                src={`./img/${index + 1}.png`}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => scrollCarousel(false)}
        className={`btn btn--prev ${currentPosition === 0 ? 'btn--disabled' : ''}`}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => scrollCarousel(true)}
        data-cy="next"
        className={`btn btn--next ${currentPosition === images.length - frameSize ? 'btn--disabled' : ''}`}
      >
        →
      </button>
    </div>
  );
};

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
};

export default Carousel;
