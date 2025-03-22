import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalImages = images.length;
  const maxIndex = totalImages - frameSize;

  const handleNext = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    const nextIndex = currentIndex + step;

    if (nextIndex > maxIndex) {
      if (infinite) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(maxIndex);
      }
    } else {
      setCurrentIndex(nextIndex);
    }

    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    const prevIndex = currentIndex - step;

    if (prevIndex < 0) {
      if (infinite) {
        setCurrentIndex(maxIndex);
      } else {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(prevIndex);
    }

    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  return (
    <div className="carousel">
      <button
        className="carousel__button carousel__button--prev"
        onClick={handlePrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>

      <div
        className="carousel__container"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        <ul
          className="carousel__track"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            width: `${totalImages * itemWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              className="carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img src={image} alt={`Slide ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="carousel__button carousel__button--next"
        onClick={handleNext}
        data-cy="next"
        disabled={!infinite && currentIndex === maxIndex}
      >
        Next
      </button>
    </div>
  );
};
