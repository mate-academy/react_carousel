import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageGap = 10;

  const handleClickPrev = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex - step;

      if (newIndex < 0) {
        return infinite ? images.length - frameSize : 0;
      }

      return newIndex;
    });
  };

  const handleClickNext = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + step;

      if (newIndex >= images.length - frameSize + 1) {
        return infinite ? 0 : images.length - frameSize;
      }

      return newIndex;
    });
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= images.length - frameSize;

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * (itemWidth + imageGap) - imageGap}px` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentIndex * (itemWidth + imageGap)}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
          gap: `${imageGap}px`,
        }}
      >
        {images.map(image => (
          <li
            key={image}
            className="Carousel__item"
            style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
          >
            <img
              src={image}
              alt={image}
              className="Carousel__image"
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__button-wrapper">
        <button
          className={cn('Carousel__button', 'Carousel__button--prev', {
            disabled: isPrevDisabled,
          })}
          type="button"
          onClick={handleClickPrev}
          disabled={isPrevDisabled}
        >
          &#9664;
        </button>
        <button
          className={cn('Carousel__button', 'Carousel__button--next', {
            disabled: isNextDisabled,
          })}
          type="button"
          data-cy="next"
          onClick={handleClickNext}
          disabled={isNextDisabled}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
