import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (index < images.length - frameSize) {
      setIndex(Math.min(index + step, images.length - frameSize));
    } else if (infinite) {
      setIndex(0);
    }
  }, [index, images.length, frameSize, step, infinite]);

  const handlePrev = () => {
    if (index > 0) {
      setIndex(Math.max(index - step, 0));
    } else if (infinite) {
      setIndex(images.length - frameSize);
    }
  };

  useEffect(() => {
    if (!infinite) {
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, animationDuration + 500);

    return () => clearInterval(interval);
  }, [infinite, index, animationDuration, handleNext]);

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${index * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((src, i) => (
          <li
            key={i}
            className="Carousel__item"
            style={{
              width: `${itemWidth}px`,
              height: `${itemWidth}px`,
            }}
          >
            <img
              src={src}
              alt={`image-${i}`}
              className="Carousel__image"
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__buttons-button"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__buttons-button"
          data-cy="next"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
