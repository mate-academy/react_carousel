import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(images.length - frameSize, 0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      if (infinite && prevIndex === maxIndex) {
        return 0;
      }

      const nextStep = prevIndex + step;

      return Math.min(nextStep, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (infinite && prevIndex === 0) {
        return maxIndex;
      }

      const prevStep = prevIndex - step;

      return Math.max(prevStep, 0);
    });
  };

  return (
    <div
      className="Carousel"
      style={
        {
          '--item-width': `${itemWidth}px`,
          '--frame-size': `${String(frameSize)}`,
          '--animation-duration': `${animationDuration}ms`,
          '--current-index': `${currentIndex}`,
          '--length': `${images.length}`,
        } as React.CSSProperties
      }
    >
      <ul className="Carousel__list">
        {images.map((img, idx) => (
          <li key={img}>
            <img
              className="Carousel__item"
              src={img}
              alt={`${idx + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="button-wrapper">
        <button
          className={`button button-prev ${currentIndex === 0 ? 'disabled' : ''}`}
          type="button"
          onClick={handlePrev}
          disabled={!infinite && currentIndex === 0}
        >
          ‹
        </button>
        <button
          className={`button button-next ${currentIndex >= images.length - frameSize ? 'disabled' : ''}`}
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Carousel;
