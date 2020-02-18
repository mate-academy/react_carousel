import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({ image, index }) => (
  <li>
    <img src={image} alt={index} />
  </li>
);

Slide.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Slide;
