import React from 'react';
import PropTypes from 'prop-types';

const Sliders = ({
  showPrevious,
  showNext,
  prevClass,
  nextClass,
}) => (
  <section className="buttons">
    <button
      type="button"
      className={prevClass}
      onClick={showPrevious}
    >
      &lt;- Previous
    </button>

    <button
      type="button"
      className={nextClass}
      onClick={showNext}
    >
      Next -&gt;
    </button>
  </section>
);

Sliders.propTypes = {
  showPrevious: PropTypes.func.isRequired,
  showNext: PropTypes.func.isRequired,
  prevClass: PropTypes.string.isRequired,
  nextClass: PropTypes.string.isRequired,
};

export default Sliders;
