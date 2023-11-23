import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  boxWidth: number,
  frameSize: number,
  step: number,
  // animationDuration: number,
  infinite: boolean,
}

export const Carousel: React.FC<Props> = ({
  images,
  boxWidth,
  frameSize,
  step,
  // animationDuration,
  infinite,
}) => {
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
          width: `${boxWidth * frameSize}px`,
          height: `${boxWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: 'translate(0px, 0px)',
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
            >
              <img
                className="Carousel__img"
                src={image}
                alt={`Smile № ${index + 1}`}
                style={{
                  width: `${boxWidth}px`,
                  height: `${boxWidth}px`,
                }}
              />
            </li>
          ))}

        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          {'<<'}
        </button>
        <button
          className="Carousel__button"
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
