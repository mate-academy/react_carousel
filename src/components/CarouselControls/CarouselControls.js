import React from 'react';
import PropTypes from 'prop-types';
import { FuncType } from '../../types';

export const CarouselControls = ({ action, text }) => (
  <button
    type="button"
    onClick={action}
  >
    {text}
  </button>
);

CarouselControls.propTypes = {
  action: FuncType.isRequired,
  text: PropTypes.string.isRequired,
};
