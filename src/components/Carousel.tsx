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
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    const newIndex = currentIndex + step;

    if (newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    } else if (infinite) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex - step;

    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    } else if (infinite) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: frameSize * itemWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} style={{ width: itemWidth }}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                style={{ width: '100%' }}
              />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" onClick={handleNext} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
