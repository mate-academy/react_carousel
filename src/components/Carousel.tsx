import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const maxImages = images.length - frameSize;

  const handlePrev = () => (
    currentImage !== 0
      ? setCurrentImage(prev => Math.max(prev - step, 0))
      : setCurrentImage(maxImages)
  );

  const handleNext = () => (
    currentImage !== maxImages
      ? setCurrentImage(prev => Math.min(prev + step, maxImages))
      : setCurrentImage(0)
  );

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
          className="Carousel__btn"
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__btn"
          data-cy="next"
          onClick={handleNext}
          disabled={isDisabledNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
