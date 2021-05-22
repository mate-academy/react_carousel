import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

const Carousel = ({ images, frameSize, itemWidth,
  animationDuration, translate, nextSlide, prevSlide }) => (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration}ms ease`,
          transform: `translateX(${translate}px)`,
        }}
      >
        {images.map((img, i) => (
          <li key={img}>
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

      <div className="Carousel__buttonBlock">
        <button
          className="Carousel__button"
          type="button"
          onClick={prevSlide}
        >
          ⇦
        </button>
        <button
          className="Carousel__button"
          type="button"
          onClick={nextSlide}
        >
          ⇨
        </button>
      </div>
    </div>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  translate: PropTypes.number.isRequired,
  nextSlide: PropTypes.func.isRequired,
  prevSlide: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
};

export default Carousel;
