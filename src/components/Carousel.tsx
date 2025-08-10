import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);

  const maxIndex = images.length - frameSize;
  const canGoPrev = infinite || firstVisibleIndex > 0;
  const canGoNext = infinite || firstVisibleIndex < maxIndex;

  const offset = -firstVisibleIndex * itemWidth;

  const handlePrev = () => {
    if (infinite) {
      const newIndex =
        (firstVisibleIndex - step + images.length) % images.length;

      setFirstVisibleIndex(newIndex);
    } else {
      const newIndex = Math.max(0, firstVisibleIndex - step);

      setFirstVisibleIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (infinite) {
      const newIndex = (firstVisibleIndex + step) % images.length;

      setFirstVisibleIndex(newIndex);
    } else {
      const newIndex = Math.min(firstVisibleIndex + step, maxIndex);

      setFirstVisibleIndex(newIndex);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${frameSize * itemWidth}px`,
          height: `${itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms ease-out`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img src={image} alt="carousel item" width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={cn('Carousel__button', { 'is-disabled': !canGoPrev })}
        onClick={handlePrev}
        disabled={!canGoPrev}
      >
        Prev
      </button>

      <button
        data-cy="next"
        type="button"
        className={cn('Carousel__button', { 'is-disabled': !canGoNext })}
        onClick={handleNext}
        disabled={!canGoNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
