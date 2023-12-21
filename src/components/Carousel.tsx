import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = images.length - frameSize;
  const isDisabledButtonPre = position === 0;
  const isDisabledButtonNext = position === maxPosition;
  const prevFrameSizeRef = useRef<number>(frameSize);

  const moviePrevious = () => {
    if (position - step > 0) {
      setPosition(position - step);
    } else {
      setPosition(0);
    }
  };

  const movieNext = () => {
    if (position + step < maxPosition) {
      setPosition(position + step);
    } else {
      setPosition(maxPosition);
    }
  };

  useEffect(() => {
    if (frameSize > prevFrameSizeRef.current && position > maxPosition) {
      setPosition(prevPosition => prevPosition - 1);
    }

    prevFrameSizeRef.current = frameSize;
  }, [frameSize, position, maxPosition]);

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul
        className="Carousel__list"
      >
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-position * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${index}`}
              width={itemWidth}
              style={{
                transition: `${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={moviePrevious}
          disabled={isDisabledButtonPre}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={movieNext}
          disabled={isDisabledButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
