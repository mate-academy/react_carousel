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

  const marginRight = 30;

  const leftSide = -(itemWidth + marginRight) * (images.length - frameSize);
  const rightSide = 0;

  const stepLength = step * (itemWidth + marginRight);

  return (
    <div
      className="Carousel"
      style={{ width: frameSize * (itemWidth + marginRight) - marginRight }}
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
          onClick={() => {
            setMarginLeft(Math.min(marginLeft + stepLength, rightSide));
          }}
        >
          {' '}
        </button>

        <button
          data-cy="next"
          type="button"
          className={cn('button', marginLeft === leftSide && 'disabled')}
          onClick={() => {
            setMarginLeft(Math.max(marginLeft - stepLength, leftSide));
          }}
        >
          {' '}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
