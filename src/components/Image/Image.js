import React from 'react';
import { ImageShape } from '../Shapes/carouselShapes';

export const Image = ({ image, alt, imageWidth }) => (
  <img src={image} alt={alt} style={{ width: `${imageWidth}px` }} />
);

Image.defaultProps = {
  imageWidth: 130,
};

Image.propTypes = ImageShape;
