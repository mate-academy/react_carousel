/* eslint-disable react/require-default-props */
import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const handleNext = () => {
    const nextIndex = currentIndex + step;

    setCurrentIndex(nextIndex > images.length - frameSize
      ? images.length - frameSize
      : nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex - step;

    setCurrentIndex(prevIndex < 0 ? 0 : prevIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      const translateValue = -itemWidth * currentIndex;

      carousel.style.transition = `transform ${animationDuration / 1000}s ease`;
      carousel.style.transform = `translateX(${translateValue}px)`;
    }
  }, [currentIndex, itemWidth, animationDuration]);

  useEffect(() => {
    if (infinite) {
      intervalRef.current = window.setInterval(() => {
        handleNext();
      }, animationDuration);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [infinite, handleNext, animationDuration]);

  const renderImages = () => {
    const slicedImages = images.slice(currentIndex, currentIndex + frameSize);

    return slicedImages.map((image, index) => (
      <li key={image} style={{ width: `${itemWidth}px` }}>
        <img src={image} alt={String(index)} />
      </li>
    ));
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: `${itemWidth * frameSize}px` }}>
        <div ref={carouselRef}>
          <ul className="Carousel__list">
            {renderImages()}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex >= images.length - frameSize && !infinite}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
