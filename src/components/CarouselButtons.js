import React from 'react';
import PropTypes from 'prop-types';

const CarouselButtons = ({ handleClick }) => (
  <div className="Carousel__buttons">
    <button
      className="Carousel__button"
      type="button"
      onClick={() => handleClick(false)}
    >
      Prev
    </button>
    <button
      className="Carousel__button"
      type="button"
      onClick={handleClick}
    >
      Next
    </button>
  </div>
);

export { CarouselButtons };

CarouselButtons.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
