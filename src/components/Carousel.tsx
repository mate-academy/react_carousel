import React, { useState, useCallback } from 'react';

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

  const [rotatedImages, setRotatedImages] = useState([...images]);

  let startIndex = +rotatedImages[0].replace(/\D/g, '') - 1;
  let endIndex = startIndex + frameSize - 1;

  const isFirstImage = !infinite
    ? startIndex === 0
    : false;

  const isLastImage = !infinite
    ? endIndex === amount - 1
    : false;

  const handleNextClick = () => {
    setRotatedImages((currentImages) => {
      startIndex = +currentImages[0].replace(/\D/g, '') - 1;
      endIndex = startIndex + frameSize - 1;

      if (endIndex + step >= amount && !infinite) {
        return [
          ...currentImages.slice(amount - endIndex - 1, amount),
          ...currentImages.slice(0, amount - endIndex - 1),
        ];
      }

      return [
        ...currentImages.slice(step, amount),
        ...currentImages.slice(0, step),
      ];
    });
  };

  let timeoutId = 0;

  const startCarousel = useCallback(() => {
    timeoutId = window.setTimeout(function animation() {
      handleNextClick();
      timeoutId = window.setTimeout(animation, animationDuration);

      if (endIndex + step >= amount && !infinite) {
        clearTimeout(timeoutId);
      }
    }, animationDuration);
  }, []);

  const handlePrevClick = () => {
    setRotatedImages((currentImages) => {
      if (startIndex - step <= 0 && !infinite) {
        return [
          ...currentImages.slice(amount - startIndex, amount),
          ...currentImages.slice(0, amount - startIndex),
        ];
      }

      return [
        ...currentImages.slice(amount - step, amount),
        ...currentImages.slice(0, amount - step),
      ];
    });
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {rotatedImages.map((image, index) => {
          const isShown = (index < frameSize);

          return (
            <li
              key={image}
              className="Carousel__item"
              style={{
                display: isShown ? 'block' : 'none',
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
