import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Arrow = ({ direction, clickFunction, glyphLink }) => (
  <button
    type="button"
    onClick={() => clickFunction(direction)}
  >
    <img
      src={glyphLink}
      alt={`${direction}-arrow`}
      className={cn('carousel__arrow', `carousel__arrow--${direction}`)}
    />
  </button>
);

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  clickFunction: PropTypes.func.isRequired,
  glyphLink: PropTypes.string.isRequired,
};

export default Arrow;
