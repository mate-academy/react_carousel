import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const handlePrev = () => {
    if (infinite && currentIndex === 0) {
      setCurrentIndex(maxIndex >= 0 ? maxIndex : 0);
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  const handleNext = () => {
    if (infinite && currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

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
        type="button"
        className="Carousel__button Carousel__button--prev"
        data-cy="prev"
        onClick={handlePrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>

      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
