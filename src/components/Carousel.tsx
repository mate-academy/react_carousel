import { useEffect, useState } from 'react';
import './Carousel.scss';
import { State } from '../types';

const Carousel = ({
  images, itemWidth, frameSize, step, animationDuration,
} : State) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [images, itemWidth, frameSize, step, animationDuration]);

  const firstSlideIndex = 0;
  const lastSlideIndex = images.length - frameSize;

  const handleNextSlide = () => {
    const nextSlideIndex = slideIndex + step;

    if (nextSlideIndex < lastSlideIndex) {
      setSlideIndex(nextSlideIndex);
    } else {
      setSlideIndex(lastSlideIndex);
    }
  };

  const handlePrevSlide = () => {
    const prevSlideIndex = slideIndex - step;

    if (prevSlideIndex > firstSlideIndex) {
      setSlideIndex(prevSlideIndex);
    } else {
      setSlideIndex(firstSlideIndex);
    }
  };

  const carouselStyle = {
    width: `${itemWidth * frameSize}px`,
    transition: `${animationDuration}ms`,
  };

  const slideStyle = {
    transform: `translateX(${0 - slideIndex * itemWidth}px)`,
    transition: `${animationDuration}ms`,
  };

  return (
    <div
      className="carousel"
      style={carouselStyle}
    >
      <ul className="carousel__list">
        {images.map(image => {
          return (
            <li
              key={image}
              className="carousel__item"
              style={slideStyle}
            >
              <img
                src={image}
                alt={image}
                width={itemWidth}
              />
            </li>
          );
        })}
      </ul>

      <div className="carousel__buttons">
        <button
          className="carousel__button carousel__button--prev"
          type="button"
          onClick={handlePrevSlide}
          disabled={slideIndex <= firstSlideIndex}
        >
          Previous
        </button>
        <button
          className="carousel__button carousel__button--next"
          type="button"
          data-cy="next"
          onClick={handleNextSlide}
          disabled={slideIndex >= lastSlideIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
