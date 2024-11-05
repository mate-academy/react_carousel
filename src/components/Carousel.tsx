import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  duration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  duration,
}) => {
  const [move, setMove] = useState(0);
  const frameWindow = frameSize * itemWidth;
  const trackLength = images.length * itemWidth - step * itemWidth;
  const way = move * itemWidth;

  function handleClick(direction: string) {
    if (direction === 'next') {
      if (move === 0) {
        setMove(step);
      } else {
        setMove(currentStep => currentStep + step);
      }
    } else if (direction === 'prev') {
      if (move === 0) {
        setMove(-step);
      } else {
        setMove(currentStep => currentStep - step);
      }
    }
  }

  const translation = way > trackLength ? -trackLength : -way;

  function isAtEnd(direction: string) {
    if (direction === 'next') {
      return move * itemWidth >= trackLength;
    } else if (direction === 'prev') {
      return move * itemWidth <= 0;
    }

    return false;
  }

  return (
    <div className="Carousel" style={{ width: `${frameWindow}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${duration}ms`,
          transform: `translateX(${translation}px)`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img
              className="Carousel__Item"
              src={image}
              alt={index.toString()}
              width={itemWidth}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <button
        className="button"
        type="button"
        onClick={() => handleClick('prev')}
        disabled={isAtEnd('prev')}
      >
        Prev
      </button>
      <button
        data-cy="next"
        className="button"
        type="button"
        onClick={() => handleClick('next')}
        disabled={isAtEnd('next')}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
