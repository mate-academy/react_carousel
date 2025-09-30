import React, { useState } from 'react';
import './Carousel.scss';
type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
};
const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            width: `${images.length * itemWidth}px`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((imgSrc, index) => (
            <li key={imgSrc}>
              <img
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={currentIndex === 0}
        type="button"
        className="Carousel__button Carousel__button--prev"
        data-cy="prev"
        onClick={() => {
          setCurrentIndex(prev => Math.max(prev - step, 0));
        }}
      >
        Prev
      </button>

      <button
        disabled={currentIndex >= images.length - frameSize}
        type="button"
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        onClick={() => {
          const maxIndex = images.length - frameSize;

          setCurrentIndex(prev => Math.min(prev + step, maxIndex));
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
