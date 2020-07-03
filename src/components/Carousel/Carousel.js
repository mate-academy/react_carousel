import React from 'react';
import './Carousel.css';
import { CarouselShapes } from '../Shapes/CarouselShape';

export const Carousel = (props) => {
  const {
    images,
    prev,
    next,
    currentPos,
    animationDuration,
    itemWidth,
    frameSize,
  } = props;

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={prev}
        className="Carousel__button"
      >
        Prev
      </button>

      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {
          images.map(image => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
                transform: `translate(${currentPos}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              <img src={image} alt="hero" className="Carousel__img" />
            </li>
          ))
        }
      </ul>

      <button
        type="button"
        onClick={next}
        className="Carousel__button"
      >
        Next
      </button>
    </div>
  );
};

Carousel.propTypes = CarouselShapes.isRequired;
