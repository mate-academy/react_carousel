import React from 'react';
import PropTypes from 'prop-types';

const CarouselButton = ({ dir, handler }) => (
  <button
    id={`carousel-btn-${dir > 0 ? 'prev' : 'next'}`}
    type="button"
    className={`carousel__btn carousel__btn--${dir > 0 ? 'prev' : 'next'}`}
    onClick={() => handler(dir)}
  />
);

CarouselButton.propTypes = {
  handler: PropTypes.func.isRequired,
  dir: PropTypes.number.isRequired,
};

export default CarouselButton;
