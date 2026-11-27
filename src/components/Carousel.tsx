import React, { useState, useEffect } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const minIndex = Math.max(firstVisibleIndex - step, 0);
  const maxIndex = Math.max(images.length - frameSize, 0);

  useEffect(() => {
    if (firstVisibleIndex > maxIndex) {
      setFirstVisibleIndex(maxIndex);
    }
  }, [firstVisibleIndex, maxIndex]);

  return (
    <div className="Carousel">
      <button
        aria-label="Previous"
        disabled={firstVisibleIndex === 0 && !infinite}
        className={classNames('Carousel__button', {
          disabled: firstVisibleIndex === 0 && !infinite,
        })}
        type="button"
        onClick={() => {
          if (infinite && firstVisibleIndex === 0) {
            setFirstVisibleIndex(maxIndex);
          } else {
            setFirstVisibleIndex(minIndex);
          }
        }}
      >
        ‹
      </button>
      <div
        className="Carousel__frame"
        style={{ width: itemWidth * frameSize + 10 * (frameSize - 1) }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${-firstVisibleIndex * (itemWidth + 10)}px)`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                width={itemWidth}
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        aria-label="Next"
        data-cy="next"
        disabled={firstVisibleIndex === maxIndex && !infinite}
        className={classNames('Carousel__button', {
          disabled: firstVisibleIndex === maxIndex && !infinite,
        })}
        type="button"
        onClick={() => {
          if (infinite && firstVisibleIndex === maxIndex) {
            setFirstVisibleIndex(0);
          } else {
            setFirstVisibleIndex(Math.min(firstVisibleIndex + step, maxIndex));
          }
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
