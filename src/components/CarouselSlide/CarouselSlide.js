import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({ image, itemWidth }) => (
  <li className="Carousel__item">
    <img style={{ width: `${itemWidth}px` }} src={image} alt="slide" />
  </li>
);

CarouselSlide.propTypes = {
  image: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default CarouselSlide;
