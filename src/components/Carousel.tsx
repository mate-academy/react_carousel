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
  const GAP = 10;
  const ITEM_STEP = itemWidth + GAP;
  const maxIndex = Math.max(images.length - frameSize, 0);

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(prev => {
      if (infinite && prev === maxIndex) {
        return 0;
      }

      const next = prev + step;

      return Math.min(next, maxIndex);
    });
  };

  const handlePrev = () => {
    setIndex(prev => {
      if (infinite && prev === 0) {
        return maxIndex;
      }

      return Math.max(prev - step, 0);
    });
  };

  return (
    <div className="Carousel" style={{ width: frameSize * ITEM_STEP - GAP }}>
      <ul
        className="Carousel__list"
        style={{
          width: `${images.length * ITEM_STEP}px`,
          transform: `translateX(-${ITEM_STEP * index}px)`,
          gap: GAP,
          transition: `${animationDuration}ms all`,
        }}
      >
        {images.map((image, i) => (
          <li key={i}>
            <img src={image} alt={`${i}`} style={{ width: itemWidth }} />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button
          type="button"
          disabled={index === 0 && !infinite}
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={index === maxIndex && !infinite}
          data-cy="next"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
