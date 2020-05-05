import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ arrow, arrowSize, itemWidth, buttonClickHandler }) => (
  <button
    type="button"
    className={
      arrow === '🢦'
        ? 'carousel__arrow carousel__arrow--prev'
        : 'carousel__arrow carousel__arrow--next'
    }
    style={{
      width: arrowSize,
      height: arrowSize,
      top: itemWidth / 2 - arrowSize / 2,
      borderRadius: itemWidth / 2,
    }}
    onClick={buttonClickHandler}
  >
    {arrow}
  </button>
);

Button.propTypes = {
  arrow: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
  arrowSize: PropTypes.number.isRequired,
  buttonClickHandler: PropTypes.func.isRequired,
};

export default Button;
