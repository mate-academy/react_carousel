import React from 'react';
import PropType from 'prop-types';

export const Image = ({ image, index }) => (
  <img src={image} alt={index} />
);

Image.propTypes = {
  image: PropType.string.isRequired,
  index: PropType.number.isRequired,
};
