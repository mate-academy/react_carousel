/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
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
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    if (currentIndex + step < images.length) {
      setCurrentIndex(currentIndex + step);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex - step >= 0) {
      setCurrentIndex(currentIndex - step);
    } else if (infinite) {
      setCurrentIndex(images.length - frameSize);
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, animationDuration);

    return () => clearInterval(interval);
  }, [currentIndex, handleNextClick, animationDuration]);

  const visibleImages = images.slice(currentIndex, currentIndex + frameSize);

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {visibleImages.map((image) => (
          <li key={image}>
            <img src={image} alt={`Зображення ${image}`} style={{ width: itemWidth }} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrevClick} data-cy="prevButton">
        prev
      </button>
      <button type="button" onClick={handleNextClick} data-cy="nextButton">
        next
      </button>
    </div>
  );
};

export default Carousel;
