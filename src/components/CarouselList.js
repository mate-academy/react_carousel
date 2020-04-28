import React from 'react';
import PropTypes from 'prop-types';

const CarouselList = ({ images, itemWidth, duration, translation }) => (
  <ul
    className="carousel__list"
    style={{
      transition: `transform ${duration}ms`,
      transform: `translateX(${translation}px)`,
    }}
  >
    {images.map(image => (
      <li key={image} className="carousel__item">
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
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  translation: PropTypes.number.isRequired,
};

export default CarouselList;
