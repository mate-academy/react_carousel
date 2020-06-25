import React from 'react';
import PropType from 'prop-types';

export const Image = ({ image, index, imageWidth }) => (
  <img src={image} alt={index} style={{ width: `${imageWidth}px` }} />
);

Image.defaultProps = {
  imageWidth: 130,
};

Image.propTypes = {
  image: PropType.string.isRequired,
  index: PropType.number.isRequired,
  imageWidth: PropType.number,
};
