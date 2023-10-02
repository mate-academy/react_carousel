import React, { useState } from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const amount = images.length;

  const [position, setPosition] = useState(0);
  const [isLastImage, setIsLastImage] = useState(false);
  const [isFirstImage, setIsFirstImage] = useState(true && !infinite);

  let lastIndex = 0;

  const handleNextClick = () => {
    setPosition((currentPosition) => {
      setIsFirstImage(false);

      lastIndex = -currentPosition / itemWidth + frameSize - 1;

      if ((lastIndex === amount - 1) && infinite) {
        return currentPosition + itemWidth * (amount - frameSize);
      }

      if (lastIndex + step >= amount - 1) {
        setIsLastImage(true && !infinite);

        return currentPosition - itemWidth * (amount - 1 - lastIndex);
      }

      return currentPosition - itemWidth * step;
    });
  };

  const handlePrevClick = () => {
    setPosition((currentPosition) => {
      setIsLastImage(false);

      const firstIndex = -currentPosition / itemWidth;

      if (!firstIndex && infinite) {
        return currentPosition - itemWidth * (amount - frameSize);
      }

      if (firstIndex - step <= 0) {
        setIsFirstImage(true && !infinite);

        return currentPosition + itemWidth * firstIndex;
      }

      return currentPosition + itemWidth * step;
    });
  };

  let timeoutId = 0;

  const startCarousel = (() => {
    timeoutId = window.setTimeout(function animation() {
      clearTimeout(timeoutId);
      handleNextClick();

      timeoutId = window.setTimeout(animation, animationDuration);

      if (lastIndex + step >= amount - 1 && !infinite) {
        clearTimeout(timeoutId);
      }
    }, animationDuration);
  });

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * amount}px`,
          }}
        >
          {images.map((image) => {
            return (
              <li
                key={image}
                className="Carousel__item"
                style={{
                  transform: `translateX(${position}px)`,
                  transition: `transform ${animationDuration / 1000}s`,
                }}
              >
                <img
                  src={image}
                  alt={image}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel__move-buttons">
        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          onClick={handlePrevClick}
          disabled={isFirstImage}
        >
          &#8592;
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button Carousel__button--next"
          onClick={handleNextClick}
          disabled={isLastImage}
        >
          &#8594;
        </button>
      </div>

      <div className="Carousel__bottom">
        <button
          type="button"
          className="Carousel__button Carousel__button--start"
          onClick={startCarousel}
        >
          Start Carousel
        </button>
      </div>
    </div>
  );
};
