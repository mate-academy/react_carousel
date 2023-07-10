import React, { useState } from 'react';

import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    const maxTransition = images.length * itemWidth - frameSize * itemWidth;

    if (infinite && currentIndex <= -maxTransition) {
      setCurrentIndex(frameSize * itemWidth);
    }

    setCurrentIndex(prevIndex => (
      prevIndex - step * itemWidth < -maxTransition
        ? -maxTransition
        : prevIndex - step * itemWidth
    ));
  };

  const handlePrevClick = () => {
    if (infinite && currentIndex >= 0) {
      setCurrentIndex(-(images.length * itemWidth));
    }

    setCurrentIndex(prevIndex => (
      prevIndex + step * itemWidth > 0
        ? 0
        : prevIndex + step * itemWidth
    ));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrap"
        style={{
          width: `${itemWidth * frameSize}px`,
          height: '100%',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(${currentIndex}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{ height: '100%' }}
            >
              <img
                src={image}
                alt={image}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevClick}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          onClick={handleNextClick}
          data-cy="next"
          disabled={
            !infinite
            && currentIndex === itemWidth * (frameSize - images.length)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
