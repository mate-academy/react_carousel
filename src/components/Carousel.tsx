import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
  const totalImages = images.length;
  const spacing = 10;
  const containerWidth = frameSize * (itemWidth + spacing);
  const offset = currentIndex * (itemWidth + spacing);

  const handleNextButton = () => {
    setCurrentIndex((prev) => {
      const maxStartIndex = totalImages - frameSize;

      const positions: number[] = [];
      for (let i = 0; i <= maxStartIndex; i += step) {
        positions.push(i);
      }

      const currentPos = positions.indexOf(prev);
      const nextPos = currentPos + 1;

      return infinite
        ? positions[nextPos % positions.length]
        : positions[Math.min(nextPos, positions.length - 1)];
    });
  };

  const handlePrevButton = () => {
    setCurrentIndex((prev) => {
      const maxStartIndex = totalImages - frameSize;

      const positions: number[] = [];
      for (let i = 0; i <= maxStartIndex; i += step) {
        positions.push(i);
      }

      const currentPos = positions.indexOf(prev);
      const prevPos = currentPos - 1;

      return infinite
        ? positions[(prevPos + positions.length) % positions.length]
        : positions[Math.max(prevPos, 0)];
    });
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
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms ease-out`,
          }}
        >
          {images.map((image: string) => (
            <li key={image} className="Carousel__item">
              <img
                src={image}
                alt={image}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="Carousel__controls"
        style={{ width: `${containerWidth}px` }}
      >
        <button
          type="button"
          onClick={handlePrevButton}
          className={`Carousel__button ${
            !infinite && currentIndex === 0 ? 'Carousel__button--disabled' : ''
          }`}
        >
          &#8592;
        </button>

        <button
          type="button"
          onClick={handleNextButton}
          className={`Carousel__button ${
            !infinite && currentIndex >= totalImages - frameSize
              ? 'Carousel__button--disabled'
              : ''
          }`}
          data-cy="next"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
