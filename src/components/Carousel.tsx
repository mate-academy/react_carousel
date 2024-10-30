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
  itemWidth,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrev() {
    setCurrentIndex(prev =>
      infinite
        ? (prev - step + images.length) % images.length
        : prev - step < 0
          ? 0
          : prev - step,
    );
  }

  function handleNext() {
    setCurrentIndex(prev =>
      infinite
        ? (prev + step) % images.length
        : prev + step >= images.length
          ? prev
          : prev + step,
    );
  }

  return (
    <div
      className="Carousel"
      style={{
        maxWidth: `${itemWidth * frameSize}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transitionDuration: `${animationDuration}ms`,
          transform: `translateX(-${(100 / frameSize) * currentIndex}%)`,
        }}
      >
        {images.map(imagePath => (
          <li key={imagePath}>
            <img
              width={itemWidth}
              src={imagePath}
              alt="image"
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
