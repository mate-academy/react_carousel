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
      const nextPos = prev + step;

      if (infinite) {
        return nextPos % images.length;
      }

      return Math.min(nextPos, maxPosition);
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const nextPos = prev - step;

      if (infinite) {
        return (nextPos + images.length) % images.length;
      }

      return Math.max(nextPos, 0);
    });
  };

  const visibleImages = infinite
    ? [...images, ...images.slice(0, frameSize)]
    : images;

  const listWidth = visibleImages.length * itemWidth;
  const currentTransform = infinite
    ? `translateX(-${position * itemWidth}px)`
    : `translateX(-${position * itemWidth}px)`;

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
            transform: currentTransform,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {visibleImages.map((img, index) => (
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

      <button
        type="button"
        onClick={handlePrev}
        disabled={!infinite && position === 0}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && position >= maxPosition}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
