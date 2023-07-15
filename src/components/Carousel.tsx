import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  // infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  // infinite,
}) => {
  const [marginLeft, setMarginLeft] = useState(0);

  const leftSide = -itemWidth * (images.length - frameSize);
  const rightSide = 0;

  return (
    <div
      className="Carousel"
      style={{ width: frameSize * itemWidth }}
    >
      <ul
        className="Carousel__list"
        style={{
          marginLeft,
          transition: `marginLeft ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={image}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              style={{ width: itemWidth }}
            />
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button
          type="button"
          className={cn('button', marginLeft === rightSide && 'disabled')}
          onClick={() => {
            setMarginLeft(Math.min(marginLeft + step * itemWidth, rightSide));
          }}
        >
          {' '}
        </button>

        <button
          data-cy="next"
          type="button"
          className={cn('button', marginLeft === leftSide && 'disabled')}
          onClick={() => {
            setMarginLeft(Math.max(marginLeft - step * itemWidth, leftSide));
          }}
        >
          {' '}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
