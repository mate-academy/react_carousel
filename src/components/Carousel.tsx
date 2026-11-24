import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  function handleNext() {
    if (currentIndex === maxIndex && infinite === true) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(currentIndex + step, maxIndex));
    }
  }

  function handlePrev() {
    if (currentIndex === 0 && infinite === true) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(Math.max(currentIndex - step, 0));
    }
  }

  return (
    <div className="Carousel" style={{ width: frameSize * itemWidth }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img src={image} alt={String(index + 1)} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
