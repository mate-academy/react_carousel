import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const gap = 5;
  const maxStartIndex = images.length - frameSize;
  const scrollNext = () => {
    setTranslateX(prev => {
      if (infinite) {
        if (prev + step > maxStartIndex) {
          return 0;
        }
      }

      return Math.min(prev + step, maxStartIndex);
    });
  };

  const scrollPrev = () => {
    setTranslateX(prev => {
      if (infinite) {
        if (prev - step < 0) {
          return maxStartIndex;
        }
      }

      return Math.max(prev - step, 0);
    });
  };

  const isDisabledPrev = translateX === 0;
  const isDisabledNext = translateX === maxStartIndex;

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={() => {
          if (infinite || !isDisabledPrev) {
            scrollPrev();
          }
        }}
        className={`button ${isDisabledPrev && !infinite ? 'disabled' : ''}`}
        data-cy="prev"
      >
        {'<'}
      </button>

      <div
        className="Container"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${translateX * (itemWidth + gap)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => {
            return (
              <li key={index}>
                <img
                  src={img}
                  alt={index.toString()}
                  className="Carousel-img"
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          if (infinite || !isDisabledNext) {
            scrollNext();
          }
        }}
        className={`button ${isDisabledNext && !infinite ? 'disabled' : ''}`}
        data-cy="next"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
