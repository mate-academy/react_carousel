import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselConfig } from '../../types';

type Props = Partial<CarouselConfig> & {
  images: string[];
  className?: string;
};

const CONTAINER_SIZE = 1300;

export const Carousel: React.FC<Props> = ({
  images,
  animationDuration = 1000,
  frameSize = 3,
  infinite = false,
  step = 1,
  itemWidth = 130,
  containerSize = 1300,
  className = '',
}) => {
  const [skipCount, setSkipCount] = useState(0);
  const gap =
    (CONTAINER_SIZE - itemWidth * frameSize) / Math.max(1, frameSize - 1);
  const translate = (itemWidth * skipCount + gap * skipCount) * -1;
  const maxSkipCount = images.length - frameSize;

  const showNext = () => {
    setSkipCount(currentSkipCount => {
      const newSkipCount = currentSkipCount + step;

      if (newSkipCount <= maxSkipCount) {
        return newSkipCount;
      }

      if (infinite && currentSkipCount === maxSkipCount) {
        return 0;
      }

      return maxSkipCount;
    });
  };

  const showPrew = () => {
    setSkipCount(currentSkipCount => {
      const newSkipCount = currentSkipCount - step;

      if (newSkipCount >= 0) {
        return newSkipCount;
      }

      if (infinite && currentSkipCount === 0) {
        return maxSkipCount;
      }

      return 0;
    });
  };

  return (
    <div className={`Carousel ${className}`}>
      <div className="Carousel__inner" style={{ maxWidth: containerSize }}>
        <ul
          className="Carousel__list"
          style={{
            columnGap: `${gap}px`,
            transform: `translateX(${translate}px)`,
            gridAutoColumns: `${itemWidth}px`,
            transition: `transform ${animationDuration}ms`,
            marginInline: `${frameSize === 1 ? gap / 2 : 0}px`,
          }}
        >
          {images.map(image => (
            <li className="Carousel__item" key={image}>
              <img className="Carousel__img" src={image} alt={image} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__controls">
        <button
          type="button"
          className="Carousel__button"
          onClick={showPrew}
          disabled={
            (!infinite && skipCount === 0) || frameSize === images.length
          }
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          onClick={showNext}
          disabled={
            (!infinite && skipCount === maxSkipCount) ||
            frameSize === images.length
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
