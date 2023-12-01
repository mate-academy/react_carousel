import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  currentImage:number;
  setCurrentImage: (value: number) => void;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  currentImage,
  setCurrentImage,
}) => {
  const maxImages = images.length - frameSize;

  function handlePrev() {
    return (
      currentImage !== 0
        ? setCurrentImage(currentImage - step >= 0 ? currentImage - step : 0)
        : setCurrentImage(maxImages)
    );
  }

  function handleNext() {
    return (
      currentImage !== maxImages
        ? setCurrentImage(currentImage + step <= maxImages
          ? currentImage + step : maxImages)
        : setCurrentImage(0)
    );
  }

  const isDisabledPrev = currentImage === 0 && !infinite;
  const isDisabledNext = currentImage === maxImages && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            className="Carousel__image"
            key={image}
            style={{
              transform: `translateX(${-(currentImage * itemWidth)}px)`,
              transition: `transform ${animationDuration}ms ease 0s`,
            }}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={
            isDisabledPrev
              ? 'Carousel__btn Carousel__btn--disabled'
              : 'Carousel__btn Carousel__btn--active'
          }
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          &larr;
        </button>
        <button
          type="button"
          className={
            isDisabledNext
              ? 'Carousel__btn Carousel__btn--disabled'
              : 'Carousel__btn Carousel__btn--active'
          }
          data-cy="next"
          onClick={handleNext}
          disabled={isDisabledNext}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
