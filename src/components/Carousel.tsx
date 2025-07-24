import React, { useState, useEffect, useRef } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../types';

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInnerRef = useRef<HTMLDivElement>(null);

  const totalItems = images.length;
  const itemFullWidth = itemWidth + 10;

  const maxIndex = Math.max(0, totalItems - frameSize);

  useEffect(() => {
    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transitionDuration = `${animationDuration}ms`;
      carouselInnerRef.current.style.transform = `translateX(-${currentIndex * itemFullWidth}px)`;
    }
  }, [currentIndex, itemFullWidth, animationDuration]);

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex((prevIndex: number) => (prevIndex + step) % totalItems);
    } else {
      setCurrentIndex((prevIndex: number) =>
        Math.min(prevIndex + step, maxIndex),
      );
    }
  };

  const handlePrevious = () => {
    if (infinite) {
      setCurrentIndex(
        (prevIndex: number) => (prevIndex - step + totalItems) % totalItems,
      );
    } else {
      setCurrentIndex((prevIndex: number) => Math.max(prevIndex - step, 0));
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= maxIndex;

  return (
    <div
      className="carousel-container"
      style={{ width: frameSize * itemFullWidth }}
    >
      <button
        type="button"
        data-cy="previous"
        className={`carousel-button carousel-button--prev ${isPrevDisabled ? 'disabled' : ''}`}
        onClick={handlePrevious}
        disabled={isPrevDisabled}
      >
        Prev
      </button>
      <div
        className="carousel-wrapper"
        style={{ width: frameSize * itemWidth, overflow: 'hidden' }}
      >
        <div
          className="carousel-inner"
          ref={carouselInnerRef}
          style={{
            width: totalItems * itemFullWidth,
            display: 'flex',
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="carousel-item"
              style={{
                width: itemWidth,
                marginRight: index < totalItems - 1 ? '10px' : '0px',
              }}
            >
              <img
                src={image}
                alt={`Carousel Item ${index + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        data-cy="next"
        className={`carousel-button carousel-button--next ${isNextDisabled ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
