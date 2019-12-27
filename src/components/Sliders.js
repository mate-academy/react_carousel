import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({ scroll, prevClass, nextClass }) => (
  <section className="buttons">
    <button
      type="button"
      className={prevClass}
      onClick={() => scroll('left')}
    >
      &lt;- Previous
    </button>

    <button
      type="button"
      className={nextClass}
      onClick={() => scroll('right')}
    >
      Next -&gt;
    </button>
  </section>
);

Controls.propTypes = {
  scroll: PropTypes.func.isRequired,
  prevClass: PropTypes.string.isRequired,
  nextClass: PropTypes.string.isRequired,
};

export default Controls;
