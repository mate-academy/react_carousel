import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentShift, setCurrentShift] = useState(0);

  const handleClickPrev = () => {
    const newShift = currentShift - step * itemWidth;
    const newIndex = currentIndex - step < 0 ? 0 : currentIndex - step;

    setCurrentShift(newShift < 0 ? 0 : newShift);
    setCurrentIndex(newIndex);
  };

  const handleClickNext = () => {
    const newShift = currentShift + step * itemWidth;
    const newIndex =
      currentIndex + step >= images.length
        ? images.length - frameSize
        : currentIndex + step;

    setCurrentShift(
      newShift > (images.length - frameSize) * itemWidth
        ? (images.length - frameSize) * itemWidth
        : newShift,
    );
    setCurrentIndex(newIndex);
  };

  const listStyle = {
    width: `${itemWidth * images.length}px`,
    transition: `transform ${animationDuration}ms ease`,
    transform: `translateX(-${currentShift}px)`,
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className={`Carousel__list ${infinite ? 'Carousel__list--animated' : ''}`}
          style={listStyle}
        >
          {images.map((image, index) => (
            <li className="Carousel__item" key={index}>
              <img
                className="Carousel__img"
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        data-cy="next"
        className="Carousel__button"
        onClick={handleClickNext}
      >
        Next
      </button>
      <button
        data-cy="prev"
        className="Carousel__button"
        onClick={handleClickPrev}
      >
        Prev
      </button>
    </div>
  );
};

export default Carousel;
