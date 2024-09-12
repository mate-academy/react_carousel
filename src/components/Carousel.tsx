import React from 'react';
import './Carousel.scss';
import { useState } from 'react';
import cn from 'classnames';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [widthOfSeenImgs, setWidthOfSeenImgs] = useState(0);

  const handleOnClickPrev = () => {
    if (widthOfSeenImgs === 0 && infinite) {
      setWidthOfSeenImgs(itemWidth * (images.length - step));
    }

    if (widthOfSeenImgs > 0) {
      if (widthOfSeenImgs < step * itemWidth) {
        setWidthOfSeenImgs(0);
      } else {
        setWidthOfSeenImgs(widthOfSeenImgs - step * itemWidth);
      }
    }
  };

  const handleOnClickNext = () => {
    if (widthOfSeenImgs === itemWidth * (images.length - step) && infinite) {
      setWidthOfSeenImgs(0);
    }

    if (widthOfSeenImgs < itemWidth * (images.length - step)) {
      if (
        widthOfSeenImgs ===
        (images.length - (images.length % step) - step) * itemWidth
      ) {
        setWidthOfSeenImgs(itemWidth * (images.length - step));
      } else {
        setWidthOfSeenImgs(widthOfSeenImgs + step * itemWidth);
      }
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        {images.map((imgUrl, ind) => (
          <li key={imgUrl}>
            <img
              className="Carousel__img"
              src={imgUrl}
              alt={String(ind + 1)}
              style={{
                transform: `translateX(-${widthOfSeenImgs}px)`,
                width: `${itemWidth}px`,
                transition: `${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className={cn('Carousel__button', {
            'Carousel__button--disabled': widthOfSeenImgs === 0 && !infinite,
          })}
          type="button"
          onClick={handleOnClickPrev}
        >
          ❮
        </button>
        <button
          className={cn('Carousel__button', {
            'Carousel__button--disabled':
              widthOfSeenImgs === itemWidth * (images.length - step) &&
              !infinite,
          })}
          data-cy="next"
          type="button"
          onClick={handleOnClickNext}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
