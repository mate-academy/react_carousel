import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images, itemWidth, frameSize, step, animationDuration,
}) => {
  const [translateX, setTranslateX] = useState(0);

  const frameWidth = itemWidth * frameSize;

  const handlePrevClick = () => {
    const prevTranslateX = translateX + itemWidth * step;
    const minTranslateX = 0;

    setTranslateX(Math.min(prevTranslateX, minTranslateX));
  };

  const handleNextClick = () => {
    const nextTranslateX = translateX - itemWidth * step;
    const maxTranslateX = -itemWidth * (images.length - frameSize);

    setTranslateX(Math.max(nextTranslateX, maxTranslateX));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${frameWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms ease 0s`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                className="Carousel__image"
                src={image}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__navigation">
          <button
            className="Carousel__button"
            type="button"
            onClick={handlePrevClick}
            disabled={translateX >= 0}
          >
            🡠
          </button>
          <button
            className="Carousel__button"
            type="button"
            data-cy="next"
            onClick={handleNextClick}
            disabled={translateX <= -itemWidth * (images.length - frameSize)}
          >
            🡢
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
