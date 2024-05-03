import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxImages = images.length - frameSize;
  const isDisabledPrev = currentImageIndex === 0 && !infinite;
  const isDisabledNext = currentImageIndex === maxImages && !infinite;

  function movePrev() {
    const index = currentImageIndex - step <= 0
      ? 0
      : currentImageIndex - step;

    const infiniteIndex = currentImageIndex === 0 && infinite
      ? maxImages
      : index;

    setCurrentImageIndex(infiniteIndex);
  }

  const moveNext = () => {
    const index = currentImageIndex + step >= maxImages
      ? maxImages
      : currentImageIndex + step;

    const infiniteIndex = currentImageIndex === maxImages && infinite
      ? 0
      : index;

    setCurrentImageIndex(infiniteIndex);
  };

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
            key={image}
            style={{
              width: frameSize * itemWidth,
              transform: `translateX(${-(currentImageIndex * itemWidth)}px)`,
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

      <div className="Carousel__controls">
        <button
          type="button"
          className={
            isDisabledPrev
              ? 'Carousel__button Carousel__button--disabled'
              : 'Carousel__button Carousel__button--active'
          }
          onClick={movePrev}
        >
          &larr;
        </button>

        <button
          type="button"
          data-cy="next"
          className={
            isDisabledNext
              ? 'Carousel__button Carousel__button--disabled'
              : 'Carousel__button Carousel__button--active'
          }
          onClick={moveNext}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
