import React from 'react';
import PropTypes from 'prop-types';
import CarouselItem from './CarouselItem';

const CarouselList = ({ images, frameSize, itemWidth }) => (
  <div
    className="carousel__container"
    style={{ width: `${frameSize * itemWidth}px` }}
  >
    <ul className="carousel__list">
      {images.map(image => (
        <CarouselItem
          {...image}
          width={itemWidth}
          key={image.id}
        />
      ))}
    </ul>
  </div>
);

CarouselList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default CarouselList;
