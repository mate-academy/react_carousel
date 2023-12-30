import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [imagePosition, setImagePosition] = useState(0);

  const endImagePosition = images.length - frameSize;
  const isDisabledStart = imagePosition === 0 && !infinite;
  const isDisabledEnd = imagePosition === endImagePosition && !infinite;

  function handleNext() {
    if (imagePosition < endImagePosition) {
      setImagePosition(current => (
        current + step <= endImagePosition
          ? current + step
          : endImagePosition
      ));
    } else {
      setImagePosition(0);
    }
  }

  function handlePrev() {
    if (imagePosition > 0) {
      setImagePosition(current => (
        current - step >= 0
          ? current - step
          : 0
      ));
    } else if (infinite) {
      setImagePosition(endImagePosition);
    }
  }

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-imagePosition * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel__image"
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          disabled={isDisabledStart}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          className="Carousel__button"
          onClick={handleNext}
          disabled={isDisabledEnd}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
