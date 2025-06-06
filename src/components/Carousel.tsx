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
  images = [],
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Максимальний індекс для звичайного режиму
  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    if (infinite) {
      // Для безкінечного режиму потрібно враховувати frameSize
      const maxValidIndex = images.length - frameSize;
      const nextIndex = currentIndex + step;

      if (nextIndex > maxValidIndex) {
        // Якщо перевищуємо максимальний валідний індекс, повертаємось на початок
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    if (infinite) {
      // Для безкінечного режиму потрібно враховувати frameSize
      const maxValidIndex = images.length - frameSize;
      const prevIndex = currentIndex - step;

      if (prevIndex < 0) {
        // Якщо йдемо менше нуля, переходимо в кінець
        setCurrentIndex(maxValidIndex);
      } else {
        setCurrentIndex(prevIndex);
      }
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  // Ефект для завершення анімації
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isAnimating, animationDuration]);

  // Перевірка, чи можна рухатися далі
  const canGoNext = infinite || currentIndex < maxIndex;
  const canGoPrev = infinite || currentIndex > 0;

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: isAnimating
              ? `transform ${animationDuration}ms ease-in-out`
              : 'none',
          }}
        >
          {images.map((src, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={src}
                alt={`${index + 1}`}
                width={itemWidth}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          onClick={handlePrev}
          disabled={!canGoPrev || isAnimating}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button Carousel__button--next"
          onClick={handleNext}
          disabled={!canGoNext || isAnimating}
          data-cy="next"
        >
          Next
        </button>
      </div>

      <div className="Carousel__info">
        <span>
          Showing {Math.min(frameSize, images.length)} of {images.length} images
          {infinite ? ' (infinite mode)' : ''}
        </span>
      </div>
    </div>
  );
};

export default Carousel;
