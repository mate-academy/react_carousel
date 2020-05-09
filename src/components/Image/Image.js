import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ image, index, itemWidth }) => (
  <img
    style={{ width: `${itemWidth}px` }}
    src={image}
    alt={index + 1}
  />
);

Image.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default Image;
