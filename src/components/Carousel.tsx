import React, { useState } from 'react';
import 'bulma';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(prevIndex - step, 0);
    });
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(prevIndex + step, images.length - frameSize);
    });
  };

  const translateX =
    currentIndex > images.length - frameSize
      ? images.length - frameSize
      : currentIndex;

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        style={{
          transform: `translateX(-${translateX * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul className="carousel__list">
          {images.map((img, index) => (
            <li className="carousel__item" key="index">
              <img
                className="carousel__img"
                src={img}
                alt={`Image ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          className="button has-background-primary-10"
          type="button"
          onClick={handlePrev}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="button has-background-primary-10"
          type="button"
          onClick={handleNext}
          data-cy="next"
          disabled={!infinite && currentIndex + step >= images.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
