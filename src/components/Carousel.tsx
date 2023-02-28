/* eslint-disable no-console */
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

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [translate, setTranslate] = useState(0);

  const initTranslate = frameSize * itemWidth;
  const maxTranslate = itemWidth * images.length - initTranslate;
  const stepWidth = itemWidth * step;

  const handleNextClick = () => {
    if (translate + stepWidth > maxTranslate) {
      setTranslate(infinite ? 0 : maxTranslate);
    } else {
      setTranslate(translate + stepWidth);
    }
  };

  const handlePrevClick = () => {
    if (translate - (stepWidth) < 0) {
      setTranslate(infinite ? maxTranslate : 0);
    } else {
      setTranslate(translate - stepWidth);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="container"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{ translate: `-${translate}px`, transition: `${animationDuration / 1000}s` }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt={image.slice(6, 7)}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevClick}
          className={(!translate && !infinite)
            ? 'Carousel__button Carousel__button--prev-disabled'
            : 'Carousel__button Carousel__button--prev'}
        >
          {}
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className={(translate === maxTranslate && !infinite)
            ? 'Carousel__button Carousel__button--next-disabled'
            : 'Carousel__button Carousel__button--next'}
          data-cy="next"
        >
          {}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
