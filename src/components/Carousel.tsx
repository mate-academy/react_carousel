import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const totalWidth = images.length * itemWidth;
  const visibleWidth = frameSize * itemWidth;

  const handleNext = () => {
    if (!infinite && position <= -totalWidth + visibleWidth) {
      return;
    }

    setPosition(prev =>
      Math.max(prev - step * itemWidth, -totalWidth + visibleWidth),
    );
  };

  const handlePrev = () => {
    if (!infinite && position >= 0) {
      return;
    }

    setPosition(prev => Math.min(prev + step * itemWidth, 0));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${visibleWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            transform: `translateX(${position}px)`,
            transition: `transform ${animationDuration}ms ease`,
            width: `${totalWidth}px`,
            gap: '10px',
          }}
        >
          {images.map((src, index) => (
            <li key={src}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <button
          data-cy="prev"
          type="button"
          onClick={handlePrev}
          disabled={!infinite && position >= 0}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={handleNext}
          disabled={!infinite && position <= -totalWidth + visibleWidth}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
