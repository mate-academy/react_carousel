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
  const maxPosition = images.length - frameSize;

  const handleNext = () => {
    setPosition(prev => {
      const newPos = prev + step;

      return infinite
        ? newPos >= images.length
          ? 0
          : newPos
        : Math.min(newPos, maxPosition);
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const newPos = prev - step;

      return infinite
        ? newPos < 0
          ? maxPosition
          : newPos
        : Math.max(newPos, 0);
    });
  };

  const translateX = -position * itemWidth;

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((src, index) => (
          <li
            className="Carousel__item"
            key={index}
            style={{ width: `${itemWidth}px` }}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              width={itemWidth}
              style={{ width: `${itemWidth}px`, height: 'auto' }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button type="button" onClick={handlePrev}>
          Prev
        </button>
        <button type="button" onClick={handleNext} data-cy="next">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
