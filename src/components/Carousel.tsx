import React, { useState } from 'react';
import './Carousel.scss';
import { ICarousel } from '../model/model';

type CarouselProps = ICarousel;

const Carousel: React.FC<CarouselProps> = props => {
  const { images, step, frameSize, itemWidth, animationDuration, infinite } =
    props;

  const [position, setPosition] = useState(0);
  const maxPosition = Math.max(images.length - frameSize, 0);

  const handlePrev = () => {
    setPosition(prev => {
      const next = prev - step;

      return next < 0 ? (infinite ? maxPosition : 0) : next;
    });
  };

  const handleNext = () => {
    setPosition(prev => {
      const next = prev + step;

      return next > maxPosition ? (infinite ? 0 : maxPosition) : next;
    });
  };

  return (
    <div className="Carousel">
      <button
        data-cy="prev"
        className="Carousel__button"
        aria-label="Previous"
        type="button"
        onClick={handlePrev}
        disabled={!infinite && position === 0}
      >
        {'<'}
      </button>
      <div
        className="Carousel__frame"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img src={image} alt={`Image ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <button
        data-cy="next"
        className="Carousel__button"
        aria-label="Next"
        type="button"
        onClick={handleNext}
        disabled={!infinite && position === maxPosition}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
