import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../types/State';

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [transformIndex, setTransformIndex] = useState(0);

  const handleNext = () => {
    setTransformIndex(prev => {
      if (infinite && prev === images.length - step) {
        return 0;
      }

      return Math.min(images.length - step, prev + step);
    });
  };

  const handlePrev = () => {
    setTransformIndex(prev => {
      if (infinite && prev === 0) {
        return images.length - step;
      }

      return Math.max(0, prev - step);
    });
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className="button"
        onClick={handlePrev}
        disabled={!infinite && transformIndex === 0}
      >
        Prev
      </button>

      <div
        className="container"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${transformIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((item, index) => (
            <li key={item}>
              <img
                src={item}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="button"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && transformIndex === images.length - step}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
