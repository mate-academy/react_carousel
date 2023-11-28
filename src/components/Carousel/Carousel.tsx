import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import './Carousel.scss';

interface Props {
  images: string[];
  imageSize: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  imageSize,
  frameSize,
  step,
  animationDuration,
  infinity,
}) => {
  const carouselSize = imageSize * frameSize;
  const lastItem = images.length - frameSize;
  const [moveItems, setMoveItems] = useState(0);

  useEffect(() => {
    if (moveItems > lastItem) {
      setMoveItems(lastItem);
    }
  }, [frameSize]);

  const handleMoveRight = () => {
    const remainingItems = images.length - (moveItems + frameSize);

    if (infinity && lastItem <= moveItems) {
      setMoveItems(0);
    }

    setMoveItems(
      (prevMoveRight) => prevMoveRight + Math.min(step, remainingItems),
    );
  };

  const handleMoveLeft = () => {
    if (infinity && moveItems === 0) {
      setMoveItems(images.length);
    }

    setMoveItems(
      (prevMoveRight) => prevMoveRight - Math.min(step, prevMoveRight),
    );
  };

  const disabledNext = moveItems === images.length - frameSize;
  const disabledPrev = moveItems === 0;

  return (
    <div
      className="carousel"
      style={{
        width: `${carouselSize}px`,
        height: `${imageSize}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="carousel__list">
        {images.map(image => (
          <li
            key={image}
            style={{
              transition: `transform ${animationDuration}ms ease`,
              transform: `translateX(-${moveItems * imageSize}px)`,
            }}
            className="carousel__item"
          >

            <img
              className="carousel__img"
              src={image}
              alt={image}
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                transition: `${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="button__box">
        <button
          type="button"
          className={cn(
            'button',
            { 'button--disabled': disabledPrev && !infinity },
          )}
          onClick={handleMoveLeft}
          style={{
            transition: `${animationDuration}ms`,
          }}
        >
          &#8592;
        </button>

        <button
          type="button"
          className={cn(
            'button',
            { 'button--disabled': disabledNext && !infinity },
          )}
          data-cy="next"
          onClick={handleMoveRight}
          style={{
            transition: `${animationDuration}ms`,
          }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
