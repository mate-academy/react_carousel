import React, { useState } from 'react';
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
  const [offsetX, setOffsetX] = useState(0);

  const maxOffSet = images.length - frameSize;
  const isDisabledButtonPre = offsetX === 0;
  const isDisabledButtonNext = offsetX === maxOffSet;

  const moviePrevious = () => {
    if (offsetX - step > 0) {
      setOffsetX(offsetX - step);
    } else {
      setOffsetX(0);
    }
  };

  const movieNext = () => {
    if (offsetX + step < maxOffSet) {
      setOffsetX(offsetX + step);
    } else {
      setOffsetX(maxOffSet);
    }
  };

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
              transform: `translateX(${-offsetX * itemWidth}px)`,
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
