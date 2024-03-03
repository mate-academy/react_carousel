import React from 'react';
import { DefaultImgValues } from '../../types/DefaultImgValues';
import './Carousel.scss';

type Props = {
  imgValues: DefaultImgValues
  transform: number
  setTransform: (value: number) => void
};

export const Carousel: React.FC<Props> = ({
  imgValues,
  transform,
  setTransform,
}) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = imgValues;

  const lastPosition = images.length - frameSize;

  const handleNextClick = () => {
    if (transform + step < lastPosition) {
      setTransform(transform + step);
    } else {
      setTransform(lastPosition);
    }

    if (infinite && transform === lastPosition) {
      setTransform(0);
    }
  };

  if (transform > lastPosition && !infinite) {
    setTransform(lastPosition);
  }

  const handlePrevClick = () => {
    if (transform - step > 0) {
      setTransform(transform - step);
    } else {
      setTransform(0);
    }

    if (infinite && transform === 0) {
      setTransform(lastPosition);
    }
  };

  return (
    <div className="carousel">
      <ul
        className="carousel__list"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        {images.map((image) => (
          <li
            key={image}
            className="carousel__item"
            style={{
              transform: `translateX(${-transform * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt="emoji"
              width={itemWidth}
              className="carousel__image"
            />
          </li>
        ))}
      </ul>

      <div className="carousel__buttons">
        <button
          data-cy="prev"
          type="button"
          className="button is-primary"
          onClick={handlePrevClick}
          disabled={transform === 0 && !infinite}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className="button is-primary"
          onClick={handleNextClick}
          disabled={transform === lastPosition && !infinite}
        >
          Next
        </button>
      </div>
    </div>
  );
};
