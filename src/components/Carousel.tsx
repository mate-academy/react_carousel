import React, { useState } from 'react';
import './Carousel.scss';
interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const safeFrameSize = Math.max(1, frameSize);
  const safeStep = Math.max(1, step);
  const gap = 12;

  const maxStartIndex = Math.max(0, images.length - safeFrameSize);
  const currentIndex = Math.min(startIndex, maxStartIndex);
  const canMove = images.length > safeFrameSize;

  const handleNext = () => {
    if (!canMove) {
      return;
    }

    setStartIndex(current => {
      if (current >= maxStartIndex) {
        return infinite ? 0 : maxStartIndex;
      }

      return Math.min(current + safeStep, maxStartIndex);
    });
  };

  const handlePrev = () => {
    if (!canMove) {
      return;
    }

    setStartIndex(current => {
      if (current <= 0) {
        return infinite ? maxStartIndex : 0;
      }

      return Math.max(current - safeStep, 0);
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: itemWidth * safeFrameSize + gap * (safeFrameSize - 1),
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: itemWidth * images.length + gap * (images.length - 1),
            transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={`${image}-${index}`}
              style={{ width: itemWidth, height: itemWidth }}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrev}
          disabled={(!infinite && currentIndex === 0) || !canMove}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={(!infinite && currentIndex === maxStartIndex) || !canMove}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
