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
      />
      <label htmlFor="animationDuration">Animation Duration</label>
      <input
        id="animationDuration"
        type="number"
        name="animationDuration"
        value={carouselAdjustments.animationDuration}
        onChange={carouselAdjustments}
        placeholder="Animation duration"
      />
      <label htmlFor="infinite">Infinite</label>
      <input
        id="infinite"
        type="text"
        name="infinite"
        value={carouselAdjustments.infinite}
        onChange={carouselAdjustments}
        placeholder="infinite"
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
    animationDuration: PropTypes.number.isRequired,
    infinite: PropTypes.bool.isRequired,
  }).isRequired,
  reset: PropTypes.func.isRequired,
  onchange: PropTypes.func.isRequired,
};
