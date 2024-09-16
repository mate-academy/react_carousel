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

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleFrameSize = frameSize * itemWidth;
  const maxStep = images.length - frameSize;
  const isPrevDisabled = !currentIndex && !infinite;
  const isNextDisabled = currentIndex >= maxStep && !infinite;

  const findNextIndex = (movement: 'next' | 'prev') => {
    const nextIndex =
      movement === 'next'
        ? Math.min(currentIndex + step, maxStep)
        : Math.max(currentIndex - step, 0);

    if (infinite) {
      if (
        (nextIndex === maxStep && movement === 'next') ||
        (nextIndex === 0 && movement === 'prev')
      ) {
        return movement === 'next' ? 0 : maxStep;
      }
    }

    return nextIndex;
  };

  const scroll = (direction: 'next' | 'prev'): void => {
    setCurrentIndex(findNextIndex(direction));
  };

  return (
    <div className="Carousel" style={{ width: `${visibleFrameSize}px` }}>
      <ul
        className="Carousel__items"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li className="Carousel__item" key={image}>
            <img src={image} width={itemWidth} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>
      <div className="Carousel__btns">
        <button
          type="button"
          className="Carousel__btn"
          disabled={isPrevDisabled}
          onClick={() => scroll('prev')}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className="Carousel__btn"
          disabled={isNextDisabled}
          onClick={() => scroll('next')}
        >
          Next
        </button>
      </div>
    </div>
  );
};
