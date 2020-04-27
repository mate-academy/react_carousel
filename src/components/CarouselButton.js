import React from 'react';
import PropTypes from 'prop-types';

const CarouselButton = ({ handler, id }) => (
  <button
    id={`carousel-btn-${id}`}
    type="button"
    className={`carousel__btn carousel__btn--${id}`}
    onClick={handler}
  />
);

CarouselButton.propTypes = {
  handler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CarouselButton;
