import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import { Settings } from '../types/settings';

type Props = {
  images: string[];
  settings: Settings;
};

export const Carousel: React.FC<Props> = ({
  images,
  settings: {
    step, frameSize, itemWidth, animationDuration, infinite,
  },
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => setOffset(0), [itemWidth]);

  const hiddenImages = (images.length - frameSize) * itemWidth;

  const showPrevImage = () => {
    setOffset(Math.min(offset + itemWidth * step, 0));

    if (offset === 0) {
      setOffset(-hiddenImages);
    }
  };

  const showNextImage = () => {
    setOffset(Math.max(offset - itemWidth * step, -hiddenImages));

    if (offset === -hiddenImages && infinite) {
      setOffset(0);
    }
  };

  const maxItemsOnPage = (images.length - frameSize) * itemWidth;

  const containerWidth = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__btn"
        onClick={showPrevImage}
        disabled={offset === 0}
      >
        <span className="Carousel__direction">left</span>
      </button>

      <ul
        className="Carousel__list"
        style={{ width: `${containerWidth}px` }}
      >
        {images.map(image => (
          <li
            className="Carousel__element"
            key={image}
            style={{
              transform: `translateX(${offset}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${image}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="Carousel__btn"
        data-cy="next"
        onClick={showNextImage}
        disabled={offset === -maxItemsOnPage && !infinite}
      >
        <span className="Carousel__direction">rigth</span>
      </button>
    </div>
  );
};
