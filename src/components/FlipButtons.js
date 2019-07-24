import React from 'react';
import PropTypes from 'prop-types';
import '../components_css/FlipButtons.css';

const FlipButtons = ({ handleFlip }) => (
  <>
    <button
      name="back"
      onClick={handleFlip}
      type="button"
      className="flip-button flip-button--back"
    >
      {'<'}
    </button>

    <button
      name="next"
      onClick={handleFlip}
      type="button"
      className="flip-button flip-button--next"
    >
      {'>'}
    </button>
  </>
);

FlipButtons.propTypes = {
  handleFlip: PropTypes.func.isRequired,
};

export default FlipButtons;
