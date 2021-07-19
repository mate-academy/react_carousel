import React from 'react';
import { ImageType, ImageStyleType } from '../../types';

export const CarouselImage = ({ image, imageStyle }) => (
  <img
    src={image}
    alt={image}
    style={imageStyle}
  />
);

CarouselImage.propTypes = {
  image: ImageType.isRequired,
  imageStyle: ImageStyleType.isRequired,
};
