import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images?: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images = [],
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const total = images.length;
  const bufferSize = infinite ? frameSize + step : 0;
  const minRealIndex = bufferSize;
  const maxRealIndex = bufferSize + total - frameSize;

  const [currentIndex, setCurrentIndex] = useState(minRealIndex);
  const [inTransition, setInTransition] = useState(true);

  const prevInfinite = useRef(infinite);

  useEffect(() => {
    if (prevInfinite.current !== infinite) {
      setInTransition(false);
      if (infinite) {
        setCurrentIndex((prev: number) => prev + (frameSize + step));
      } else {
        const lastValid = Math.max(0, total - frameSize);

        setCurrentIndex((prev: number) =>
          Math.max(0, Math.min(lastValid, prev - (frameSize + step))),
        );
      }

      prevInfinite.current = infinite;
    }
  }, [infinite, frameSize, step, total]);

  if (!total) {
    return null;
  }

  const prevDisabled = !infinite && currentIndex <= minRealIndex;
  const nextDisabled = !infinite && currentIndex >= maxRealIndex;

  const handlePrev = () => {
    if (prevDisabled) {
      return;
    }

    setInTransition(true);
    setCurrentIndex((prev: number) =>
      infinite ? prev - step : Math.max(minRealIndex, prev - step),
    );
  };

  const handleNext = () => {
    if (nextDisabled) {
      return;
    }

    setInTransition(true);
    setCurrentIndex((prev: number) =>
      infinite ? prev + step : Math.min(maxRealIndex, prev + step),
    );
  };

  const handleTransitionEnd = () => {
    if (!infinite) {
      return;
    }

    if (currentIndex < minRealIndex) {
      setInTransition(false);
      setCurrentIndex((prev: number) => prev + total);
    } else if (currentIndex >= minRealIndex + total) {
      setInTransition(false);
      setCurrentIndex((prev: number) => prev - total);
    }
  };

  const renderedImages = [];

  if (infinite) {
    for (let i = -bufferSize; i < total + bufferSize; i++) {
      const index = ((i % total) + total) % total;

      renderedImages.push(images[index]);
    }
  } else {
    renderedImages.push(...images);
  }

  return (
    <div className="carousel__body">
      <button
        type="button"
        className={`carousel__btn ${prevDisabled ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={prevDisabled}
      >
        &#9664;
      </button>

      <div
        className="carousel__frame"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="carousel__list"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: inTransition
              ? `transform ${animationDuration}ms ease-in-out`
              : 'none',
          }}
        >
          {renderedImages.map((src, idx) => (
            <li
              key={idx}
              className="carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img src={src} alt={`slide-${idx}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className={`carousel__btn ${nextDisabled ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={nextDisabled}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
