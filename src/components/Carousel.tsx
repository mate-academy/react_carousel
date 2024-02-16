import React from "react";
import "./Carousel.scss";

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  currentImage: number;
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
  const carouselWidth = frameSize * itemWidth;
  const imageTranslate = currentImage * itemWidth;

  function handlePrev() {
    return currentImage !== 0
      ? setCurrentImage(currentImage - step >= 0 ? currentImage - step : 0)
      : setCurrentImage(maxImages);
  }

  function handleNext() {
    return currentImage !== maxImages
      ? setCurrentImage(
        currentImage + step <= maxImages ? currentImage + step : maxImages,
      )
      : setCurrentImage(0);
  }

  const isDisabledPrevHandle = currentImage === 0 && !infinite;
  const isDisabledNextHandle = currentImage === maxImages && !infinite;

  return (
    <div
      className="carousel"
      style={{
        width: `${carouselWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="carousel__list">
        {images.map((image, index) => (
          <li
            className="carousel__image"
            key={image}
            style={{
              transform: `translateX(${-imageTranslate}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            <img src={image} alt={`${index + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="carousel__buttons">
        <button
          type="button"
          className={
            isDisabledPrevHandle
              ? "carousel__button carousel__button--disabled"
              : "carousel__button carousel__button--active"
          }
          onClick={handlePrev}
          disabled={isDisabledPrevHandle}
        >
          &larr;
        </button>
        <button
          type="button"
          className={
            isDisabledNextHandle
              ? "carousel__button carousel__button--disabled"
              : "carousel__button carousel__button--active"
          }
          data-cy="next"
          onClick={handleNext}
          disabled={isDisabledNextHandle}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
