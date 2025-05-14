import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 1,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = -currentIndex * itemWidth;

  return (
    <div className="Carousel">
      <button
        className="Carousel__button Carousel__button--prev"
        type="button"
        disabled={!infinite && currentIndex <= 0}
        onClick={() => {
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - step);
          } else if (infinite) {
            const maxIndex = images.length - frameSize;

            setCurrentIndex(maxIndex);
          }
        }}
      >
        ‹
      </button>

      <div
        className="Carousel__frame"
        style={{ width: `${itemWidth * frameSize + 10 * (frameSize - 1)}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((src, index) => (
            <li key={index}>
              <img
                data-cy="carousel-image"
                src={src}
                alt={`image-${index + 1}`}
                width={itemWidth}
                height={itemWidth}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className="Carousel__button Carousel__button--next"
        type="button"
        disabled={currentIndex >= images.length - frameSize}
        onClick={() => {
          const maxIndex = images.length - frameSize;

          if (currentIndex + step <= maxIndex) {
            setCurrentIndex(currentIndex + step);
          } else if (infinite) {
            setCurrentIndex(0);
          }
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
