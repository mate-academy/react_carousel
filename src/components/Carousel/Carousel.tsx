import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../../types/State';

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const isLastPosition = images.length - frameSize;
  const isDisabledButtonPrev = (infinite && frameSize === images.length)
      || (position === 0 && !infinite);
  const isDisabledButtonNext = (infinite && frameSize === images.length)
  || (position === isLastPosition && !infinite);

  const onButtonNext = () => {
    if (position + step < isLastPosition) {
      setPosition(position + step);
    } else {
      setPosition(isLastPosition);
    }

    if (infinite && position === isLastPosition) {
      setPosition(0);
    }
  };

  const onButtonPrev = () => {
    if (position - step > 0) {
      setPosition(position - step);
    } else {
      setPosition(0);
    }

    if (infinite && position === 0) {
      setPosition(isLastPosition);
    }
  };

  const getImgName = (imgUrl: string): string => {
    const lastDotIndex = imgUrl.lastIndexOf('.');
    const lastSlashIndex = imgUrl.lastIndexOf('/');
    let imgName = '';

    if (lastDotIndex !== -1 && lastSlashIndex !== -1) {
      imgName = imgUrl.slice(lastSlashIndex + 1, lastDotIndex);
    }

    return imgName;
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <div className="Carousel__wrapper">
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * images.length}px`,
          }}
        >
          {images.map(img => (
            <li
              key={getImgName(img)}
              className="Carousel__item"
              style={{
                transform: `translateX(${-position * itemWidth}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              <img
                src={img}
                width={itemWidth}
                className="Carousel__img"
                alt={getImgName(img)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__btns">
        <button
          type="button"
          className="Carousel__btn"
          onClick={onButtonPrev}
          disabled={isDisabledButtonPrev}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className="Carousel__btn"
          onClick={onButtonNext}
          disabled={isDisabledButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
