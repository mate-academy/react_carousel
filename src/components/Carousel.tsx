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

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const maxIndex = images.length - frameSize;

    if (currentIndex - step < 0 && infinite === true) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(Math.max(0, currentIndex - step));
    }
  };

  const handleNext = () => {
    const maxIndex = images.length - frameSize;

    if (infinite === true && currentIndex + step > maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + step));
    }
  };

  return (
    <div
      className="Carousel"
      style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
    >
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0 && !infinite}
        className={currentIndex === 0 && !infinite ? 'disabled' : ''}
        data-cy="prev"
      >
        &lt;
      </button>

      <div
        className="Cariusel__window"
        style={{
          width: frameSize * itemWidth,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{
                width: itemWidth,
                padding: '0 5px',
                boxSizing: 'border-box',
                flexShrink: 0,
              }}
            >
              <img
                src={image}
                alt="carousel item"
                width={itemWidth}
                style={{ display: 'block' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex === images.length - frameSize && !infinite}
        className={
          currentIndex === images.length - frameSize && !infinite
            ? 'disabled'
            : ''
        }
        data-cy="next"
      >
        &gt;
      </button>
    </div>
  );
};
