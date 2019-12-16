import React from 'react';
import PropTypes from 'prop-types';

const CarouselList = (
  { images, itemWidth, animationDuration, translation }
) => (
  <ul
    className="carousel__list"
    style={{
      transition: `transform ${animationDuration}ms`,
      transform: `translateX(${translation}px)`,
    }}
  >
    {images.map(image => (
      <li
        key={image}
        className="carousel__item"
      >
        <img
          className="carousel_image"
          style={{ width: itemWidth }}
          src={image}
          alt={image.replace(/\D/g, '')}
        />
      </li>
    ))}
  </ul>
);

CarouselList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  translation: PropTypes.number.isRequired,
};

export default CarouselList;
