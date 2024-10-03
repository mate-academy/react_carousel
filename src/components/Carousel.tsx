import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  infinite: boolean;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  step,
  itemWidth,
  infinite,
  animationDuration,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxImages = images.length - frameSize;
  const isDisabledPrev = currentImageIndex === 0 && !infinite;
  const isDisabledNext = currentImageIndex === images.length - 1 && !infinite;

  function movePrev() {
    const index = Math.max(0, currentImageIndex - step);

    setCurrentImageIndex(index);
  }

  function moveNext() {
    const index = Math.min(maxImages, currentImageIndex + step);

    setCurrentImageIndex(index);
  }

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        transitionDuration: `${animationDuration}ms`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__list-item"
            style={{
              width: `${itemWidth}px`,
              transform: `translateX(${-(currentImageIndex * itemWidth)}px)`,
              transition: `transform ${animationDuration}ms ease 0s`,
            }}
          >
            <img
              src={image}
              className="Carousel__image"
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
              ? 'Carousel__button Carousel__button--disabled'
              : 'Carousel__button Carousel__button--active'
          }
          onClick={movePrev}
        >
          Prev
        </button>
        <button
          type="button"
          className={
            isDisabledNext
              ? 'Carousel__button Carousel__button--disabled'
              : 'Carousel__button Carousel__button--active'
          }
          onClick={moveNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
