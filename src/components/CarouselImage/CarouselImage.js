import React from 'react';
import { imageType, imageStyleType } from '../../types';

export const CarouselImage = props => (
  <img
    src={props.image}
    alt={props.image}
    style={props.imageStyle}
  />
);

CarouselImage.propTypes = {
  image: imageType.isRequired,
  imageStyle: imageStyleType.isRequired,
};
