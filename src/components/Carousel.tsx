import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  items: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animation: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  items,
  itemWidth,
  frameSize,
  step,
  animation,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextItems = () => {
    let nextIndex = currentIndex + step;

    if (infinite) {
      nextIndex = nextIndex >= items.length ? 0 : nextIndex;

      const remainingItems = items.length - nextIndex;

      if (remainingItems < frameSize) {
        nextIndex = Math.max(0, items.length - frameSize);
      }
    } else {
      nextIndex = Math.min(nextIndex, items.length - frameSize);
    }

    setCurrentIndex(nextIndex);
  };

  const showPreviousItems = () => {
    let prevIndex = currentIndex - step;

    if (infinite) {
      if (prevIndex <= 0 - frameSize) {
        prevIndex = items.length - frameSize;
      } else if (prevIndex > 0 - frameSize && prevIndex <= 0) {
        prevIndex = 0;
      }
    } else {
      prevIndex = Math.max(currentIndex - step, 0);
    }

    setCurrentIndex(prevIndex);
  };

  return (
    <div
      className="Carousel box"
      style={{ width: `${(itemWidth * frameSize) + 40}px` }}
    >

      <div className="Carousel__wrapper">
        <div
          className="Carousel__container"
          style={{
            transform: `translateX(-${currentIndex * (itemWidth)}px)`,
            transition: `transform ${animation}ms linear`,
          }}
        >
          <ul className="Carousel__list">
            {items.map((item) => (
              <li key={item} className="Carousel__item">
                <img
                  className="Carousel__image"
                  style={{ width: `${itemWidth}px` }}
                  src={item}
                  alt={item}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="Carousel__controls">
        <button
          type="button"
          className="button"
          onClick={showPreviousItems}
          disabled={currentIndex <= 0 && !infinite}
        >
          <span className="icon is-small">
            <i className="fa-solid fa-arrow-left"> </i>
          </span>
        </button>

        <button
          type="button"
          data-cy="next"
          className="button"
          onClick={showNextItems}
          disabled={currentIndex >= items.length - frameSize && !infinite}
        >
          <span className="icon is-small">
            <i className="fa-solid fa-arrow-right"> </i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
