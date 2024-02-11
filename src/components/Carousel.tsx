import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [shift, setShift] = useState<number>(0);

  const totalLength = images.length * itemWidth;
  const visibleLength = frameSize * itemWidth;
  const stepLength = step * itemWidth;

  const nextMove = () => {
    setShift(prevShift => {
      const newShift = prevShift + stepLength;

      return newShift > (totalLength - visibleLength)
        ? totalLength - visibleLength
        : newShift;
    });
  };

  const prevMove = () => {
    setShift(prevShift => {
      const newShift = prevShift - stepLength;

      return newShift > 0
        ? prevShift - stepLength
        : 0;
    });
  };

  return (
    <div
      className="Carousel container-outer"
      style={{ width: `${visibleLength}px` }}
    >
      <ul
        className="Carousel__list container-inner"
        style={{
          width: `${totalLength}px`,
          transition: `transform, ${animationDuration}ms`,
          transform: `translateX(${-shift}px)`,
        }}
      >
        {images.map((image, i) => (
          <li
            key={image}
            className="Carousel__item"
          >
            <img
              className="Carousel__img"
              src={image}
              alt={`${i + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button
          className={cn(
            'button',
            'button--prev',
            { disabled: shift === 0 },
          )}
          type="button"
          onClick={prevMove}
          disabled={shift === 0}
        >
          🡄 Prev
        </button>

        <button
          className={cn(
            'button',
            'button--next',
            { disabled: shift === (totalLength - visibleLength) },
          )}
          type="button"
          data-cy="next"
          onClick={nextMove}
          disabled={shift === (totalLength - visibleLength)}
        >
          Next 🡆
        </button>
      </div>
    </div>
  );
};

export default Carousel;
