import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const containerWidth = itemWidth * frameSize;
  const maxIndex = Math.max(images.length - frameSize, 0);
  const offsetX = startIndex * itemWidth;
  const handleNext = () => {
    if (startIndex + step > maxIndex) {
      if (infinite) {
        const newIndex = (startIndex + step) % (maxIndex + 1);

        setStartIndex(newIndex);
      }
    } else {
      setStartIndex(startIndex + step);
    }
  };

  const handlePrev = () => {
    if (startIndex - step < 0) {
      if (infinite) {
        const newIndex = (maxIndex + 1 + startIndex - step) % (maxIndex + 1);

        setStartIndex(newIndex);
      }
    } else {
      setStartIndex(startIndex - step);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${containerWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offsetX}px)`,
            transition: `transform ${animationDuration}ms`,
            width: `${containerWidth}px`,
          }}
        >
          {images.map((src, i) => {
            const isVisible = i >= startIndex && i < startIndex + frameSize;

            return (
              <li
                key={i}
                className="Carousel__item"
                style={{
                  width: `${itemWidth}px`,
                  visibility: isVisible ? 'visible' : 'hidden',
                }}
              >
                <img
                  src={src}
                  alt={`Image ${i + 1}`}
                  data-cy="carousel-image"
                  width={itemWidth}
                  height={130}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="Carousel__button_wrapper">
        <button
          type="button"
          className={`Carousel__button ${startIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          Previous
        </button>

        <button
          type="button"
          data-cy="next"
          className={`Carousel__button ${startIndex >= maxIndex ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={startIndex >= maxIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
