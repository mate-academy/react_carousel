import React, { useState, useMemo } from 'react';

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

  const startIndex = +rotatedImages[0].replace(/\D/g, '') - 1;

  const endIndex = startIndex + frameSize - 1;

  const isFirstImage = !infinite
    ? startIndex === 0
    : false;

  const isLastImage = !infinite
    ? endIndex === amount - 1
    : false;

  const scrollLogic = () => {
    if (endIndex + frameSize >= amount && !infinite) {
      setRotatedImages([
        ...rotatedImages.slice(amount - endIndex - 1, amount),
        ...rotatedImages.slice(0, amount - endIndex - 1),
      ]);
    } else {
      setRotatedImages([
        ...rotatedImages.slice(step, amount),
        ...rotatedImages.slice(0, step),
      ]);
    }
  };

  let timeoutId = 0;

  useMemo(() => {
    timeoutId = window.setTimeout(scrollLogic, animationDuration);
  }, [endIndex]);

  const handlePrevClick = () => {
    clearTimeout(timeoutId);

    if (startIndex - step <= 0 && !infinite) {
      setRotatedImages([
        ...rotatedImages.slice(
          amount - startIndex, amount,
        ),
        ...rotatedImages.slice(0, amount - startIndex),
      ]);
    } else {
      setRotatedImages([
        ...rotatedImages.slice(amount - step, amount),
        ...rotatedImages.slice(0, amount - step),
      ]);
    }
  };

  const handleNextClick = () => {
    clearTimeout(timeoutId);
    scrollLogic();
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

      <div className="Carousel__buttons">
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
    </div>
  );
};
