import React from 'react';
import PropTypes from 'prop-types';

const CarouselImage = ({ image, itemWidth }) => (
  <li>
    <img
      style={{ width: `${itemWidth}px` }}
      className="carousel__item"
      src={image}
      alt="img"
    />
  </li>
);

CarouselImage.propTypes = {
  image: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default CarouselImage;
