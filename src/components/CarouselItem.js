import React from 'react';
import PropTypes from 'prop-types';

const CarouselItem = ({ url, alt, width, height }) => (
  <li className="carousel__item">
    <img
      src={url}
      alt={alt}
      className="carousel__image"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  </li>
);

CarouselItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default CarouselItem;
