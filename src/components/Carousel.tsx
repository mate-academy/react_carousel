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

const FIRST = 0;

const SlideItem: React.FC<{
  src: string;
  size: number;
  visible: boolean;
  index: number;
}> = ({ src, size, visible, index }) => (
  <li
    className="Carousel__item"
    style={{
      width: size,
      flex: '0 0 auto',
      visibility: visible ? 'visible' : 'hidden',
    }}
  >
    <img
      className="Carousel__img"
      src={src}
      alt={`Slide ${index + 1}`}
      width={size}
      height={size}
      style={{ height: size }}
    />
  </li>
);

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const maxStart = Math.max(FIRST, images.length - frameSize);
  const safeStep = Math.max(1, Math.min(step, Math.max(1, images.length)));
  const [index, setIndex] = useState(FIRST);

  const isAtStart = index === FIRST;
  const isAtEnd = index >= maxStart;

  const canPrev = infinite ? images.length > frameSize : !isAtStart;
  const canNext = infinite ? images.length > frameSize : !isAtEnd;

  const viewportWidth = frameSize * itemWidth;
  const translateX = -index * itemWidth;

  const handleNext = () => {
    if (!images.length) {
      return;
    }

    if (infinite) {
      setIndex(isAtEnd ? FIRST : Math.min(index + safeStep, maxStart));

      return;
    }

    if (!isAtEnd) {
      setIndex(Math.min(index + safeStep, maxStart));
    }
  };

  const handlePrev = () => {
    if (!images.length) {
      return;
    }

    if (infinite) {
      setIndex(isAtStart ? maxStart : Math.max(index - safeStep, FIRST));

      return;
    }

    if (!isAtStart) {
      setIndex(Math.max(index - safeStep, FIRST));
    }
  };

  return (
    <div className="Carousel" style={{ width: viewportWidth }}>
      <div className="Carousel__viewport" style={{ width: viewportWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, i) => {
            const visible = i >= index && i < index + frameSize;

            return (
              <SlideItem
                key={src + i}
                src={src}
                size={itemWidth}
                visible={visible}
                index={i}
              />
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        className={`Carousel__btn Carousel__btn--prev${!canPrev ? ' is-disabled' : ''}`}
        onClick={handlePrev}
        disabled={!canPrev}
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        type="button"
        className={`Carousel__btn Carousel__btn--next${!canNext ? ' is-disabled' : ''}`}
        onClick={handleNext}
        disabled={!canNext}
        aria-label="Next"
        data-cy="next"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
