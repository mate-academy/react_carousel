import React from 'react';
import PropTypes from 'prop-types';
import { CarouselImage } from '../CarouselImage/CarouselImage';
import { ImageStyleType, ImageType } from '../../types';

export const CarouselList = props => (
  <ul
    className="Carousel__list"
    style={props.carouselStyle}
  >
    <div
      className="Carousel__list-scroll"
      style={props.carouselListStyle}
    >
      {props.images.map(image => (
        <li key={image}>
          <CarouselImage image={image} imageStyle={props.imageStyle} />
        </li>
      ))}
    </div>
  </ul>
);

CarouselList.propTypes = {
  imageStyle: ImageStyleType.isRequired,
  images: PropTypes.arrayOf(ImageType.isRequired).isRequired,
  carouselStyle: PropTypes.shape({
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    overflow: PropTypes.string.isRequired,
  }).isRequired,
  carouselListStyle: PropTypes.shape({
    transform: PropTypes.string.isRequired,
    transitionDuration: PropTypes.string.isRequired,
  }).isRequired,
};
