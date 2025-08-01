import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setPosition(prev => {
      if (infinite) {
        return (prev + step) % images.length;
      }

      return Math.min(prev + step, maxPosition);
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      if (infinite) {
        return (prev - step + images.length) % images.length;
      }

      return Math.max(prev - step, 0);
    });
  };

  const listWidth = images.length * itemWidth;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${listWidth}px`,
            display: 'flex',
            transform: `translateX(-${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li key={index} style={{ flexShrink: 0 }}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
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
