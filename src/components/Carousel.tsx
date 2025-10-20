import React, { useState, useRef } from 'react';
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
  const [offset, setOffset] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // --- Compute positions and limits safely ---
  const positions = Math.max(images.length - frameSize + 1, 1);
  const maxOffset = positions - 1;

  const goNext = () => {
    let newOffset;

    if (infinite) {
      // wrap safely within valid range
      newOffset = (((offset + step) % positions) + positions) % positions;
    } else {
      // clamp to end
      newOffset = Math.min(offset + step, maxOffset);
    }

    setOffset(newOffset);
  };

  const goPrev = () => {
    let newOffset;

    if (infinite) {
      // wrap safely backward
      newOffset = (((offset - step) % positions) + positions) % positions;
    } else {
      // clamp to start
      newOffset = Math.max(offset - step, 0);
    }

    setOffset(newOffset);
  };

  // --- Translate the carousel ---
  const translateX = -(offset * itemWidth);
  const listStyle: React.CSSProperties = {
    width: `${images.length * itemWidth}px`,
    transform: `translateX(${translateX}px)`,
    transition: `transform ${animationDuration}ms ease`,
  };

  // Disable navigation if no scrolling is possible
  const disableNav = images.length <= frameSize;

  return (
    <div
      className="Carousel"
      style={{
        width: frameSize * itemWidth,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ul className="Carousel__list" ref={listRef} style={listStyle}>
        {images.map((src, index) => (
          <li
            key={`${src}-${index}`}
            className="Carousel__item"
            style={{ width: itemWidth }}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              width={itemWidth}
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        data-cy="prev"
        onClick={goPrev}
        disabled={disableNav}
      >
        Prev
      </button>

      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        onClick={goNext}
        disabled={disableNav}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
