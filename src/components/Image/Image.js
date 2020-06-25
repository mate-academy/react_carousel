import React from 'react';
import PropType from 'prop-types';

export const Image = ({ image, alt, imageWidth }) => (
  <img src={image} alt={alt} style={{ width: `${imageWidth}px` }} />
);

Image.defaultProps = {
  imageWidth: 130,
};

Image.propTypes = {
  image: PropType.string.isRequired,
  alt: PropType.number.isRequired,
  imageWidth: PropType.number,
};
