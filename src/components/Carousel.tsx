import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  frameSize: number,
  itemWidth: number,
  step: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
}) => {
  const [translateX, setTranslateX] = useState(0);

  const margin = 20;
  const imageWidth = itemWidth + margin;
  const containerWidth = images.length * imageWidth;
  const startOffset = 0;
  const scrollWidth = step * imageWidth;
  const isPrevDisabled = translateX === startOffset;
  const isNextDisabled
  = -translateX === containerWidth - (frameSize * imageWidth);

  const handlePrevClick = () => {
    const imagesLeft = (-translateX) / imageWidth;

    if (imagesLeft - step < 0) {
      setTranslateX(prev => prev + imagesLeft * imageWidth);
    } else {
      setTranslateX(prev => prev + scrollWidth);
    }
  };

  const handleNextClick = () => {
    const imagesRight = (containerWidth + translateX) / imageWidth;

    if (imagesRight - frameSize < step) {
      setTranslateX(prev => prev - (imagesRight - frameSize) * imageWidth);
    } else {
      setTranslateX(prev => prev - scrollWidth);
    }
  };

  return (
    <div
      className="Carousel"
      style={
        {
          width: `${frameSize * (itemWidth + margin)}px`,
        }
      }
    >
      <ul
        className="Carousel__list"
        style={
          {
            transform: `translateX(${translateX}px)`,
            transition: `all ${animationDuration}ms`,
          }
        }
      >
        {
          images.map((image, i) => (
            <li
              className="Carousel__item"
              key={image}
            >
              <img
                src={image}
                alt={String(i + 1)}
                className="Carousel__img"
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))
        }
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={isPrevDisabled}
          onClick={handlePrevClick}
          className="Carousel__button"
        >
          Prev
        </button>

        <button
          type="button"
          disabled={isNextDisabled}
          onClick={handleNextClick}
          data-cy="next"
          className="Carousel__button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
