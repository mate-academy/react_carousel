import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const initialPosition = 0;
  const [translateX, setTranslateX] = useState(initialPosition);
  // const carouselWidth = itemWidth * frameSize;
  const fullWidth = itemWidth * images.length;

  function handleNext() {
    setTranslateX(prevTranslateX => {
      const maxScroll = itemWidth * (images.length - frameSize);

      if (infinite) {
        return (prevTranslateX + itemWidth * step) % fullWidth;
      }

      return Math.min(prevTranslateX + itemWidth * step, maxScroll);
    });
  }

  function handlePrev() {
    setTranslateX(prevTranslateX => {
      if (infinite) {
        return (prevTranslateX - itemWidth * step + fullWidth) % fullWidth;
      }

      return Math.max(prevTranslateX - itemWidth * step, initialPosition);
    });
  }

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <div
        className="Carousel__container"
        style={{
          transform: `translateX(${-translateX}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
          width: `${fullWidth}px`,
        }}
      >
        <ul className="Carousel__list">
          {images.map(item => (
            <li className="Carousel__item" key={item}>
              <img
                className="Carousel__img"
                src={item}
                alt="carousel item"
                style={{ width: `${itemWidth}px`, height: 'auto' }}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button Carousel__button-prev"
          onClick={handlePrev}
          // disabled={translateX === initialPosition}
        ></button>
        <button
          data-cy="next"
          type="button"
          className="Carousel__button Carousel__button-next"
          onClick={handleNext}
          // disabled={translateX >= (images.length - frameSize) * itemWidth}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
