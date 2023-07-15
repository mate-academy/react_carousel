import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [marginLeft, setMarginLeft] = useState(0);

  const marginRight = 30;

  const leftSide = -(itemWidth + marginRight) * (images.length - frameSize);
  const rightSide = 0;

  const stepLength = step * (itemWidth + marginRight);

  const slideRight = () => {
    setMarginLeft(Math.max(marginLeft - stepLength, leftSide));
  };

  const slideLeft = () => {
    setMarginLeft(Math.min(marginLeft + stepLength, rightSide));
  };

  return (
    <div
      className="Carousel"
      style={{ width: frameSize * (itemWidth + marginRight) - marginRight }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${marginLeft}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={image}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              style={{
                width: itemWidth,
                marginRight,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button
          type="button"
          className={cn('button', marginLeft === rightSide && 'disabled')}
          onClick={slideLeft}
        >
          {' '}
        </button>

        <button
          data-cy="next"
          type="button"
          className={cn('button', marginLeft === leftSide && 'disabled')}
          onClick={slideRight}
        >
          {' '}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
