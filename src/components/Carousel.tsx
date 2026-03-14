import React, { useState } from 'react';
import './Carousel.scss';
// import classNames = require('classnames');

interface Props {
  images: string[];
  frameSize?: number;
  step?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  frameSize = 3,
  step = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [index, setIndex] = useState(0);

  const viewportWidth = itemWidth * frameSize;
  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    if (index >= maxIndex) {
      if (infinite) {
        setIndex(0);
      }

      return;
    }

    setIndex(prev => Math.min(prev + step, maxIndex));
  };

  const handlePrev = () => {
    if (index === 0) {
      if (infinite) {
        setIndex(maxIndex);
      }

      return;
    }

    setIndex(prev => Math.max(prev - step, 0));
  };

  return (
    <div className="Carousel">
      <h1 data-cy="title">Carousel</h1>
      <div className="Carousel__viewport" style={{ width: viewportWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${index * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, i) => (
            <li key={i}>
              <img
                src={img}
                alt={`img-${i}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="prev"
        onClick={handlePrev}
        disabled={infinite && index === 0}
      >
        Prev
      </button>
      <button
        data-cy="next"
        onClick={handleNext}
        disabled={infinite && index >= maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
