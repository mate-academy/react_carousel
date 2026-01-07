import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameWidth = frameSize * itemWidth;
  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    if (infinite) {
      // циклічний режим
      setCurrentIndex(prev => (prev + step) % images.length);
    } else {
      // звичайний режим
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev - step + images.length) % images.length);
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: frameWidth, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{ width: itemWidth }}
            >
              <img src={image} alt={`Slide ${index}`} />
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
