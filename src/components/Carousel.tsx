import React, { useState, useEffect } from 'react';
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

  const maxIndex = Math.max(0, images.length - frameSize);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  function handleNext() {
    setCurrentIndex(prev => Math.min(maxIndex, prev + step));
  }

  function handlePrev() {
    setCurrentIndex(prev => Math.max(0, prev - step));
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map(image => (
            <li
              className="Carousel__item"
              key={image}
              style={{ width: `${itemWidth}px` }}
            >
              <img
                className="Carousel__img"
                src={image}
                alt="Carousel item"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <div>
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
            disabled={!infinite && currentIndex === maxIndex}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
