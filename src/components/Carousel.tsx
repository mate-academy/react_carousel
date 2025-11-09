import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const containerWidth = frameSize * itemWidth;

  function handlePrev() {
    let newIndex = currentIndex - step;

    if (newIndex < 0) {
      if (infinite) {
        setIsJumping(true);
        newIndex = images.length - frameSize;

        setTimeout(() => {
          setIsJumping(false);
        }, 10);
      } else {
        newIndex = 0;
      }
    }

    setCurrentIndex(newIndex);
  }

  function handleNext() {
    let newIndex = currentIndex + step;

    if (newIndex > images.length - frameSize) {
      if (infinite) {
        setIsJumping(true);
        newIndex = 0;

        setTimeout(() => {
          setIsJumping(false);
        }, 20);
      } else {
        newIndex = images.length - frameSize;
      }
    }

    setCurrentIndex(newIndex);
  }

  return (
    <div className="Carousel">
      <button
        type="button"
        disabled={currentIndex === 0 && !infinite}
        onClick={handlePrev}
      >
        Prev
      </button>
      <div
        className="Carousel__wrapper"
        style={{
          width: `${containerWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: isJumping ? 'none' : `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, index) => (
            <li key={index}>
              <img
                src={src}
                alt={`${index}`}
                className="Carousel__image"
                width={itemWidth}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-cy="next"
        disabled={currentIndex >= images.length - frameSize && !infinite}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
