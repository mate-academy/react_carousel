import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  startingImage: number,
  setStartingImage: (value: number) => void;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  startingImage,
  setStartingImage,
}) => {
  const carouselWidth = itemWidth * frameSize;
  const translateDistance = startingImage * itemWidth;
  const maxImages = images.length - frameSize;

  const handlePrev = () => {
    const stepResult = startingImage - step;
    const limitStep = stepResult < 0 ? 0 : stepResult;

    return setStartingImage(startingImage === 0 ? maxImages : limitStep);
  };

  const handleNext = () => {
    const stepResult = startingImage + step;
    const limitStep = stepResult > maxImages ? maxImages : stepResult;

    return setStartingImage(startingImage === maxImages ? 0 : limitStep);
  };

  const isDisabledPrev = startingImage === 0 && !infinite;
  const isDisabledNext = startingImage === maxImages && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: `${carouselWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map(value => (
          <li
            key={value}
            className="Carousel__item"
            style={{
              transform: `translateX(-${translateDistance}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={value}
              alt={value[6]}
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
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          ←
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={isDisabledNext}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel;
