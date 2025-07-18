import React, { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth = 130,
  animationDuration,
}) => {
  const [offset, setOffset] = useState(0);
  const maxOffset = -(itemWidth * (images.length - frameSize));
  const isAtEnd = offset <= maxOffset;
  const isAtStart = offset === 0;

  return (
    <div className="Carousel">
      <button
        type="button"
        disabled={isAtStart}
        className={classNames('Carousel__button', {
          disabled: isAtStart,
        })}
        onClick={() => setOffset(prev => Math.min(prev + step * itemWidth, 0))}
      >
        Prev
      </button>

      <div
        className="Carousel__container"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, index) => (
            <li key={index}>
              <img
                className="Carousel__img"
                src={src}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-cy="next"
        disabled={isAtEnd}
        className={classNames('Carousel__button', {
          disabled: isAtEnd,
        })}
        onClick={() =>
          setOffset(prev => Math.max(prev - step * itemWidth, maxOffset))
        }
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
