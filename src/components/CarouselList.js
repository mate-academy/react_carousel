import React from 'react';
import PropTypes from 'prop-types';
import CarouselItem from './CarouselItem';

const CarouselList = ({
  images,
  itemWidth,
  itemHeight,
  offset,
  shift,
  animationDuration,
}) => (
  <ul
    className="carousel__list"
    style={{
      transform: `translateX(${offset}px)`,
      transition: `transform ${animationDuration}ms ease`,
      left: `${shift}px`,
      color: 'red',
    }}
  >
    {images.map(image => (
      <CarouselItem
        {...image}
        width={itemWidth}
        height={itemHeight}
        key={image.id}
      />
    ))}
  </ul>
);

CarouselList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  shift: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default CarouselList;
