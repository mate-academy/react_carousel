import React, { useState } from 'react';
import './Carousel.scss';

export type IProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

export const Carousel: React.FC<IProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex - step < 0 ? images.length - step : prevIndex - step,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex + step >= images.length ? 0 : prevIndex + step,
    );
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((img, i) => (
          <li key={img}>
            <img src={img} alt={`${i} + 1`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button type="button" data-cy="prev" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
