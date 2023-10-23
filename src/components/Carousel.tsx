import React from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  currentImage: number;
  setCurrentImage: (value: number) => void;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  currentImage,
  setCurrentImage,
}) => {
  const carouselWidth = itemWidth * frameSize;
  const translateDistance = currentImage * itemWidth;
  const maxImages = images.length - frameSize;

  const handlePrev = () => {
    const stepResult = currentImage - step;
    const limitStep = stepResult < 0 ? 0 : stepResult;

    return setCurrentImage(currentImage === 0 ? maxImages : limitStep);
  };

  const handleNext = () => {
    const stepResult = currentImage + step;
    const limitStep = stepResult > maxImages ? maxImages : stepResult;

    return setCurrentImage(currentImage === maxImages ? 0 : limitStep);
  };

  const isDisabledPrev = currentImage === 0 && !infinite;
  const isDisabledNext = currentImage === maxImages && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: `${carouselWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, id) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(-${translateDistance}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${id + 1}`}
              width={itemWidth}
              className="Carousel__image"
              style={{
                transition: `${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={isDisabledPrev}
          className={cn('Carousel__button', {
            'Carousel__button--disabled': isDisabledPrev,
          })}
          onClick={handlePrev}
        >
          ←
        </button>

        <button
          type="button"
          data-cy="next"
          disabled={isDisabledNext}
          className={cn('Carousel__button', {
            'Carousel__button--disabled': isDisabledNext,
          })}
          onClick={handleNext}
        >
          →
        </button>
      </div>
    </div>
  );
};
