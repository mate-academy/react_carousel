import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  // Обчислюємо максимально можливу позицію.
  // Math.max потрібен на випадок, якщо картинок менше, ніж розмір рамки.
  const maxPosition = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setPosition(prev => {
      const newPosition = prev + step;

      if (newPosition > maxPosition) {
        return infinite ? 0 : maxPosition;
      }

      return newPosition;
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const newPosition = prev - step;

      if (newPosition < 0) {
        return infinite ? maxPosition : 0;
      }

      return newPosition;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="container"
        style={{ width: `${itemWidth * frameSize - 1}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} style={{ minWidth: `${itemWidth}px` }}>
              <img src={image} alt={`Image ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handlePrev}
        type="button"
        disabled={!infinite && position === 0}
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        type="button"
        data-cy="next"
        disabled={!infinite && position >= maxPosition}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
