import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + step;

      if (infinite) {
        return nextIndex % images.length;
      }

      return Math.min(nextIndex, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - step;

      if (infinite) {
        return (nextIndex + images.length) % images.length;
      }

      return Math.max(nextIndex, 0);
    });
  };

  // Calcular deslocamento de forma circular
  const getOffset = () => {
    if (!infinite) {
      return currentIndex * itemWidth;
    }

    // Evita salto quando currentIndex + frameSize ultrapassa o limite
    const endIndex = currentIndex + frameSize;

    if (endIndex > images.length) {
      return 0; // reinício visual
    }

    return currentIndex * itemWidth;
  };

  return (
    <div className="carousel">
      <button className="carousel__button" onClick={handlePrev}>
        Prev
      </button>

      <div
        className="carousel__viewport"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="carousel__track"
          style={{
            transform: `translateX(-${getOffset()}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((img, index) => (
            <li
              key={index}
              className="carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={img}
                alt={`img-${index}`}
                width={itemWidth}
                style={{ width: `${itemWidth}px`, height: 'auto' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button className="carousel__button" onClick={handleNext} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
