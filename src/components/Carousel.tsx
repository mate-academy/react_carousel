import React, { useState } from 'react';
import './Carousel.scss';
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
  const gapBetweenImgs = 10;
  const maxWidth =
    itemWidth * (images.length - frameSize) +
    gapBetweenImgs * (images.length - frameSize);

  const handleOnClickPrev = () => {
    if (widthOfSeenImgs === 0 && infinite) {
      setWidthOfSeenImgs(maxWidth);
    } else if (widthOfSeenImgs > 0) {
      const newWidth = Math.max(
        0,
        widthOfSeenImgs - step * (itemWidth + gapBetweenImgs),
      );

      setWidthOfSeenImgs(newWidth);
    }
  };

  const handleOnClickNext = () => {
    if (widthOfSeenImgs >= maxWidth && infinite) {
      setWidthOfSeenImgs(0);
    } else if (widthOfSeenImgs < maxWidth) {
      const remainingItems =
        images.length -
        Math.floor(widthOfSeenImgs / (itemWidth + gapBetweenImgs)) -
        frameSize;
      const stepsToMove = Math.min(step, remainingItems);
      const newWidth = Math.min(
        maxWidth,
        widthOfSeenImgs + stepsToMove * (itemWidth + gapBetweenImgs),
      );

      setWidthOfSeenImgs(newWidth);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${frameSize * itemWidth + gapBetweenImgs * (frameSize - 1)}px`,
          gap: `${gapBetweenImgs}px`,
        }}
      >
        {images.map((imgUrl, ind) => (
          <li className="Carousel__item" key={imgUrl}>
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
              widthOfSeenImgs >= maxWidth && !infinite,
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
