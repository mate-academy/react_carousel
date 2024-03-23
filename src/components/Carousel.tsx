import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../types/State';

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startImage, setStartImage] = useState(0);

  const gap = 10;
  const carouselWidth = frameSize * itemWidth + (frameSize - 1) * gap;

  const handlePrevImage = () => {
    if (infinite && startImage === 0) {
      setStartImage(images.length - frameSize);
    } else {
      setStartImage(prevStartImage => Math.max(0, prevStartImage - step));
    }
  };

  const handleNextImage = () => {
    if (infinite && startImage >= images.length - frameSize) {
      setStartImage(0);
    } else {
      setStartImage(prevStartImage =>
        Math.min(images.length - frameSize, prevStartImage + step),
      );
    }
  };

  const translateX = startImage * (itemWidth + gap);

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: carouselWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap,
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img src={image} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevImage}
          disabled={!infinite && startImage === 0}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={handleNextImage}
          disabled={!infinite && startImage >= images.length - frameSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
