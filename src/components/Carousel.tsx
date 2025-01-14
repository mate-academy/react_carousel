import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  // infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 1,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  // infinite = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;
  const lastSlide = totalSlides - frameSize;

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + step, lastSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - step, 0));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ maxWidth: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{ maxWidth: `${frameSize * itemWidth}px` }}
        >
          {images.map((slide, i) => (
            <li
              key={slide}
              style={{
                transform: `translateX(${-currentSlide * itemWidth}px)`,
                transition: `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              <img
                src={slide}
                alt={`${i + 1}`}
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
          onClick={prevSlide}
        >
          {'<<<'}
        </button>
        <button
          className="Carousel__button Carousel__button--active"
          data-cy="next"
          type="button"
          onClick={nextSlide}
        >
          {'>>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
