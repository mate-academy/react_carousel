import React, { useState } from 'react';
import './Carousel.scss';
import { Controls } from '../types/Controls';

interface Props extends Controls {
  images: string[];
}

export const Carousel: React.FC<Props> = (props) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    isInfinite,
  } = props;

  const [shift, setShift] = useState(0);

  const gap = 5;
  const frameWidth = frameSize * (itemWidth + gap);
  const maxShift = images.length - frameSize;

  const handlePrevClick = () => {
    setShift(currentShift => {
      if (currentShift === 0 && isInfinite) {
        return maxShift;
      }

      return currentShift - step > 0
        ? currentShift - step
        : 0;
    });
  };

  const handleNextClick = () => {
    setShift(currentShift => {
      if (currentShift === maxShift && isInfinite) {
        return 0;
      }

      return currentShift + step < maxShift
        ? currentShift + step
        : maxShift;
    });
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${shift * (itemWidth + gap)}px)`,
            transition: `${animationDuration}ms transform`,
          }}
        >
          {images.map((image, i) => (
            <li key={image}>
              <img
                className="Carousel__img"
                src={image}
                alt={(i + 1).toString()}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevClick}
          disabled={!shift && !isInfinite}
        >
          {'<'}
        </button>

        <button
          type="button"
          className="Carousel__button"
          onClick={handleNextClick}
          disabled={!isInfinite && shift === maxShift}
          data-cy="next"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
