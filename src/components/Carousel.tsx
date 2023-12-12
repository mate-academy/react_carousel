import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[];
  imageSize: number;
  numberOfVisible: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  imageSize,
  numberOfVisible,
  step,
  animationDuration,
  isInfinite,
}) => {
  const totalImages = images.length;

  const positions = images
    .map((_image, i) => -imageSize * (i))
    .slice(0, totalImages - numberOfVisible + 1);

  const [
    positionIndex,
    setPositionIndex,
  ] = useState(0);

  const currentPossition = positions[positionIndex];

  function handleNextClick() {
    if (positionIndex !== positions.length - 1) {
      const newPositionIndex = positionIndex + step > positions.length - 1
        ? positions.length - 1
        : positionIndex + step;

      setPositionIndex(newPositionIndex);
    } else if (isInfinite) {
      setPositionIndex(0);
    }
  }

  function handlePrevClick() {
    if (positionIndex !== 0) {
      const newPositionIndex = positionIndex - step < 0
        ? 0
        : positionIndex - step;

      setPositionIndex(newPositionIndex);
    } else if (isInfinite) {
      setPositionIndex(positions.length - 1);
    }
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${imageSize * numberOfVisible}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${imageSize * images.length}px`,
            transform: `translateX(${currentPossition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => (
            <li
              key={images.indexOf(image)}
            >
              <img
                src={image}
                alt={String(i)}
                style={{
                  width: `${imageSize}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'button--prev', {
            'button--prev-disabled':
            positionIndex === 0 && !isInfinite,
          })}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className={cn('button', 'button--next', {
            'button--next-disabled':
            positionIndex === positions.length - 1 && !isInfinite,
          })}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
