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
  const [position, setPosition] = useState(0);

  const gap = 10;
  const maxPosition = Math.max(images.length - frameSize, 0);

  const handleNext = () => {
    if (infinite) {
      setPosition(prev => (prev + step) % images.length);
    } else {
      setPosition(prev => Math.min(prev + step, maxPosition));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setPosition(prev => (prev - step + images.length) % images.length);
    } else {
      setPosition(prev => Math.max(prev - step, 0));
    }
  };

  const frameWidth = frameSize * itemWidth + (frameSize - 1) * gap;

  const listWidth = images.length * itemWidth + images.length * gap;

  return (
    <div className="Carousel-wrapper">
      <button
        data-cy="prev"
        className="arrow"
        onClick={handlePrev}
        disabled={!infinite && position === 0}
      >
        ‹
      </button>

      <div
        className="Carousel-frame"
        style={{
          width: frameWidth,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: listWidth,
            transform: `translateX(-${position * (itemWidth + gap)}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((img, index) => (
            <li key={index} className="Carousel__item">
              <img
                src={img}
                alt={`img-${index + 1}`}
                width={itemWidth}
                height={itemWidth}
                data-cy={`img-${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className="arrow"
        onClick={handleNext}
        disabled={!infinite && position >= maxPosition}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
