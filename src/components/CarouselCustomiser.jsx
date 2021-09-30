import React from 'react';

import './CarouselCustomiser.css';
import PropTypes from 'prop-types';

export const CarouselCustomizer = ({
  carouselAdjustments,
  onchange,
  reset,
}) => (
  <div className="carousel-customizer">
    <form onSubmit={reset}>
      <label htmlFor="step">Step</label>
      <input
        id="step"
        type="number"
        name="step"
        value={carouselAdjustments.step}
        onChange={onchange}
        placeholder="Step"
      />
      <label htmlFor="frameSize">Frame Size</label>
      <input
        id="frameSize"
        type="number"
        name="frameSize"
        value={carouselAdjustments.frameSize}
        onChange={onchange}
        placeholder="Frame size"
      />
      <label htmlFor="itemWidth">Item Width</label>
      <input
        id="itemWidth"
        type="number"
        name="itemWidth"
        value={carouselAdjustments.itemWidth}
        onChange={onchange}
        placeholder="Item width"
        min={130}
        max={400}
        step={45}
      />
      <button type="submit">Reset</button>
    </form>
  </div>
);

CarouselCustomizer.propTypes = {
  carouselAdjustments: PropTypes.shape({
    step: PropTypes.number.isRequired,
    frameSize: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
  }).isRequired,
  reset: PropTypes.func.isRequired,
  onchange: PropTypes.func.isRequired,
};
