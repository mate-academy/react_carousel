import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
}

export const Carousel: React.FC<Props> = ({ inputs, images }) => {
  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinite,
  } = inputs;

  const [currentImage, setCurrentImage] = useState(0);
  const maxImagesPosition = images.length - frameSize;
  const isDisabledPrev = currentImage === 0 && !infinite;
  const isDisabledNext = currentImage === maxImagesPosition
  && !infinite;

  const handlePrev = () => (
    currentImage !== 0
      ? setCurrentImage(prev => Math.max(prev - step, 0))
      : setCurrentImage(maxImagesPosition)
  );

  const handleNext = () => (
    currentImage !== maxImagesPosition
      ? setCurrentImage(prev => Math.min(prev + step, maxImagesPosition))
      : setCurrentImage(0)
  );

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
          height: `${itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transform: `translateX(-${itemWidth * currentImage}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                className="Carousel__img"
                src={image}
                alt={`Smile № ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}

        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button Carousel__button--active"
          type="button"
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          {'<<'}
        </button>
        <button
          className="Carousel__button Carousel__button--active"
          type="button"
          onClick={handleNext}
          disabled={isDisabledNext}
          data-cy="next"
        >
          {'>>'}
        </button>
      </div>

    </div>
  );
};

export default Carousel;
