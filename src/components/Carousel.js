import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

const Carousel = ({
  images,
  itemWidth,
  frameSize,
  animationDuration,
  translateX,
  nextButton,
  prevButton,
}) => (
  <div
    className="carousel"
    style={{
      width: `${itemWidth * frameSize}px`,
    }}
  >
    <ul
      className="carousel__list"
    >
      {images.map((img, i) => (
        <li
          key={img}
          className="carousel__item"
          style={{
            transition: `transform ${animationDuration}ms ease`,
            transform: `translateX(${translateX}px)`,
          }}
        >
          <img
            src={img}
            alt={i}
            style={{
              width: `${itemWidth}px`,
            }}
          />
        </li>
      ))}
    </ul>
    <section
      className="carousel__inner"
    >
      <button
        type="button"
        className="carousel__btn"
        onClick={prevButton}
      >
        Prev
      </button>
      <button
        type="button"
        className="carousel__btn"
        onClick={nextButton}
      >
        Next
      </button>
    </section>
  </div>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  translateX: PropTypes.number.isRequired,
  prevButton: PropTypes.func.isRequired,
  nextButton: PropTypes.func.isRequired,
};

export default Carousel;
