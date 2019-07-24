import React from 'react';
import PropTypes from 'prop-types';

function ControlButton({ text, changeView, className }) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={changeView}
      >
        {text}
      </button>
    </div>
  );
}

ControlButton.propTypes = {
  text: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default ControlButton;
