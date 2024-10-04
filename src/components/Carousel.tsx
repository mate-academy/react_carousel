import React, { useState, useMemo } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const parseNumber = (value: string | number, fallback: number): number => {
    const parsed: number = Number(value);

    return isNaN(parsed) ? fallback : parsed;
  };

  // Ensure that parsed numbers are handled safely
  const itemWidthValid: number = parseNumber(itemWidth, 130);
  const frameSizeValid: number = parseNumber(frameSize, 3);
  const stepValid: number = parseNumber(step, 3);

  const maxIndex: number = Math.max(0, images.length - frameSizeValid);

  const containerWidth: number = useMemo(
    () => itemWidthValid * images.length,
    [itemWidthValid, images.length],
  );

  const handleNext = (): void => {
    let newIndex: number = currentIndex + stepValid;

    if (newIndex > maxIndex) {
      newIndex = infinite ? 0 : maxIndex;
    }

    setCurrentIndex(newIndex);
  };

  const handlePrev = (): void => {
    let newIndex: number = currentIndex - stepValid;

    if (newIndex < 0) {
      newIndex = infinite ? maxIndex : 0;
    }

    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container">
      <h1 data-cy="title">Carousel</h1>

      <div
        className="carousel-frame"
        style={{ width: `${itemWidthValid * frameSizeValid}px` }}
      >
        <ul
          className="carousel-items"
          style={{
            width: `${containerWidth}px`,
            transform: `translateX(-${currentIndex * itemWidthValid}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={`${image}-${index}`} className="carousel-list-item">
              <img
                src={image}
                alt={`carousel-item-${index}`}
                width={itemWidthValid} // Ensure width is assigned as an attribute
                className="carousel-item"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="carousel-button prev"
        data-cy="prev"
        onClick={handlePrev}
        disabled={!infinite && currentIndex - stepValid < 0}
      >
        Previous
      </button>

      <button
        className="carousel-button next"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && currentIndex + stepValid > maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
