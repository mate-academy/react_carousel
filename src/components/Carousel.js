import React from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ images, itemWidth }) => (
  <section className="carousel">
    {images.map(image => (
      <img
        key={image}
        src={image}
        width={itemWidth}
        alt="Smiley face"
        className="carousel__img"
      />
    ))}
  </section>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default Carousel;
