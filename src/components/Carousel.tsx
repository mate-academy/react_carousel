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
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(images.length - frameSize, 0);

  const handleNext = () => {
    setPosition(prev => {
      const nextPosition = prev + step;

      return nextPosition <= maxPosition
        ? nextPosition
        : infinite
          ? 0
          : maxPosition;
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const nextPosition = prev - step;

      return nextPosition >= 0 ? nextPosition : infinite ? maxPosition : 0;
    });
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
            transform: `translateX(-${position * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
              style={{ width: `${itemWidth}px` }}
            >
              <img src={image} alt={`Slide ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>

      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
