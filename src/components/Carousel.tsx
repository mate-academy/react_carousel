import React, { useState, useCallback } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

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
  const lastIndex = Math.max(images.length - frameSize, 0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (infinite && currentIndex === lastIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(currentIndex + step, lastIndex));
    }
  }, [currentIndex, lastIndex, step, infinite]);

  const handlePrev = useCallback(() => {
    if (infinite && currentIndex === 0) {
      setCurrentIndex(lastIndex);
    } else {
      setCurrentIndex(Math.max(currentIndex - step, 0));
    }
  }, [currentIndex, lastIndex, step, infinite]);

  const canGoPrev = infinite || currentIndex > 0;
  const canGoNext = infinite || currentIndex < lastIndex;

  const listStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: `${images.length * itemWidth}px`,
    transform: `translateX(${-currentIndex * itemWidth}px)`,
    transition: `transform ${animationDuration}ms ease`,
    height: '100%',
  } as React.CSSProperties;

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul className="Carousel__list" style={listStyle}>
          {images.map((src, idx) => (
            <li
              key={src}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img src={src} alt={`Image ${idx + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__controls">
        <button
          type="button"
          className={classNames('Carousel__button', 'Carousel__button--prev', {
            'Carousel__button--disabled': !canGoPrev,
          })}
          onClick={handlePrev}
          disabled={!canGoPrev}
        >
          Prev
        </button>
        <button
          type="button"
          className={classNames('Carousel__button', 'Carousel__button--next', {
            'Carousel__button--disabled': !canGoNext,
          })}
          onClick={handleNext}
          disabled={!canGoNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
