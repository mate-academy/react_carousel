import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const maxStart = Math.max(0, images.length - frameSize);
  const safeStep = Math.max(1, Math.min(step, Math.max(1, images.length)));
  const [index, setIndex] = useState(0);

  const canPrev = infinite ? images.length > frameSize : index > 0;
  const canNext = infinite ? images.length > frameSize : index < maxStart;

  const viewportWidth = frameSize * itemWidth;

  const translateX = -index * itemWidth;

  const goNext = () => {
    if (!images.length) {
      return;
    }

    if (infinite) {
      if (index >= maxStart) {
        setIndex(0);
      } else {
        setIndex(Math.min(index + safeStep, maxStart));
      }

      return;
    }

    if (index < maxStart) {
      setIndex(Math.min(index + safeStep, maxStart));
    }
  };

  const goPrev = () => {
    if (!images.length) {
      return;
    }

    if (infinite) {
      if (index === 0) {
        setIndex(maxStart);
      } else {
        setIndex(Math.max(index - safeStep, 0));
      }

      return;
    }

    if (index > 0) {
      setIndex(Math.max(index - safeStep, 0));
    }
  };

  return (
    <div
      className="Carousel"
      style={{ width: viewportWidth, position: 'relative' }}
    >
      <div
        className="Carousel__viewport"
        style={{ width: viewportWidth, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            gap: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
            willChange: 'transform',
          }}
        >
          {images.map((src, i) => {
            const isVisible = i >= index && i < index + frameSize;

            return (
              <li
                key={src + i}
                style={{
                  width: itemWidth,
                  flex: '0 0 auto',
                  visibility: isVisible ? 'visible' : 'hidden',
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  width={itemWidth}
                  height={itemWidth}
                  style={{
                    width: '100%',
                    height: itemWidth,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={goPrev}
        disabled={!canPrev}
        aria-label="Previous"
        className={`Carousel__btn Carousel__btn--prev${!canPrev ? ' is-disabled' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: -44,
          transform: 'translateY(-50%)',
        }}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goNext}
        disabled={!canNext}
        aria-label="Next"
        data-cy="next"
        className={`Carousel__btn Carousel__btn--next${!canNext ? ' is-disabled' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          right: -44,
          transform: 'translateY(-50%)',
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
