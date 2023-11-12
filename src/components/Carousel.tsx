import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProp = {
  images: string[];
  step: number
  frameSize: number;
  itemWidth: number;
  animationDuration:number;
};

const Carousel: React.FC<CarouselProp> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
}) => {
  const widthContainer = frameSize * itemWidth;
  let disabledButtonNext = false;
  let disabledButtonPrev = false;
  const maxLength = images.length - step;

  const [currentIndex, setCurrentIndex] = useState(0);

  if (currentIndex === images.length - step) {
    disabledButtonNext = true;
  }

  if (currentIndex === 0) {
    disabledButtonPrev = true;
  }

  const moveBack = () => (
    currentIndex !== 0
      ? setCurrentIndex(prevIndex => Math.max(prevIndex - step, 0))
      : setCurrentIndex(maxLength)
  );
  const moveForward = () => (
    currentIndex !== maxLength
      ? setCurrentIndex(prevIndex => Math.min(prevIndex + step, maxLength))
      : setCurrentIndex(0)
  );

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${widthContainer}px`,
        }}
      >
        <ul
          style={{
            transform: `translateX(-${(currentIndex * itemWidth)}px)`,
            transition: `all ${animationDuration}ms`,
          }}
          className="Carousel__list"
        >
          {
            images.map((img: string, index: number) => (
              <li
                className="Carousel__item"
                key={img}
              >
                <img
                  className="Carousel__img"
                  src={img}
                  alt={`${index + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))
          }
        </ul>
      </div>
      <div className="Carousel__wraper">
        <button
          className="Carousel__button"
          type="button"
          disabled={disabledButtonPrev}
          onClick={moveBack}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          data-cy="next"
          type="button"
          onClick={moveForward}
          disabled={disabledButtonNext}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
