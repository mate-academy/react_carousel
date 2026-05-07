import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [offset, setOffset] = useState(0);

  const maxOffset = images.length - frameSize;

  const handleNext = () => {
    if (infinite) {
      setOffset(prev => (prev + step) % images.length);
    } else {
      setOffset(prev => Math.min(prev + step, maxOffset));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setOffset(prev => (prev - step + images.length) % images.length);
    } else {
      setOffset(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {images.map((img, index) => (
            <li key={img} style={{ flexShrink: 0 }}>
              <img src={img} alt={String(index + 1)} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        disabled={!infinite && offset === 0}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && offset >= maxOffset}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
