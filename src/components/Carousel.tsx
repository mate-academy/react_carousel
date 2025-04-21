import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const maxBack = 0;
  const maxForward = -Math.max(0, images.length - frameSize);
  const isAtStart = position === maxBack;
  const isAtEnd = position === maxForward;

  const handlePrevClick = () => {
    if (infinite && isAtStart) {
      setPosition(maxForward);
    } else if (!isAtStart) {
      setPosition(Math.min(position + step, maxBack));
    }
  };

  const handleNextClick = () => {
    if (infinite && isAtEnd) {
      setPosition(maxBack);
    } else if (!isAtEnd) {
      setPosition(Math.max(position - step, maxForward));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <div className="Carousel__viewport">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
            width: `${images.length * itemWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={`carousel-item-${index}`}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                className="Carousel__image"
                src={image}
                alt={`Carousel image ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevClick}
          disabled={!infinite && isAtStart}
          aria-label="Previous images"
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={handleNextClick}
          disabled={!infinite && isAtEnd}
          aria-label="Next images"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
