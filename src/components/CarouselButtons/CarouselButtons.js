import React from 'react';
import PropTypes from 'prop-types';
import './CarouselButtons.css';

const CarouselButtons = ({ slidesSize, prevClick, nextClick }) => (
  <div className="Carousel__buttons">
    <button
      onClick={() => prevClick(slidesSize)}
      type="button"
      className="Carousel__button"
    >
      Prev
    </button>
    <button
      onClick={() => nextClick(slidesSize)}
      type="button"
      className="Carousel__button"
    >
      Next
    </button>
  </div>
);

CarouselButtons.propTypes = {
  slidesSize: PropTypes.number.isRequired,
  prevClick: PropTypes.func.isRequired,
  nextClick: PropTypes.func.isRequired,
};

export default CarouselButtons;
