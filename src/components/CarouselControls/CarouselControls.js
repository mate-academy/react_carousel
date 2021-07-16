import React from 'react';
import PropTypes from 'prop-types';

export const CarouselControls = props => (
  <button
    type="button"
    onClick={props.app[props.text]}
  >
    {props.text}
  </button>
);

CarouselControls.propTypes = {
  app: PropTypes.shape({
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
};
