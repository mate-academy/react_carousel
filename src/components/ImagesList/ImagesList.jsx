import React from 'react';
import PropTypes from 'prop-types';
import { ImagesType } from '../../types';

export const ImagesList = ({ images, itemWidth, position }) => (
  <ul
    className="carousel__list"
    style={{
      width: `${itemWidth * images.length}px`,
      marginLeft: `${-position}px`,
    }}
  >
    {images.map((image, i) => (
      <li key={image} className="carousel__item">
        <img
          src={image}
          width={`${itemWidth}px`}
          alt={i + 1}
        />
      </li>
    ))}
  </ul>
);

ImagesList.propTypes = {
  images: ImagesType.isRequired,
  itemWidth: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
};
