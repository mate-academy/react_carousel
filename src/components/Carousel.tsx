import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}
const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const prev = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(prevIndex - step, 0);
    });
  };

  const next = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(prevIndex + step, maxIndex);
    });
  };

  const translateX = currentIndex > maxIndex ? maxIndex : currentIndex;

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        style={{
          transform: `translateX(-${translateX * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul className="carousel__list">
          {images.map((image, index) => (
            <li key={index} className="carousel__item">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="carousel__buttons">
        <button
          type="button"
          onClick={prev}
          className="carousel__button"
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={next}
          data-cy="next"
          className="carousel__button"
          disabled={!infinite && currentIndex + frameSize >= images.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
