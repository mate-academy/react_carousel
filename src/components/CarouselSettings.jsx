import React from 'react';
import './CarouselSettings.scss';
import PropTypes from 'prop-types';

export const CarouselSettings = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  handleChange,
}) => (
  <div className="inputs">
    <div className="step">
      <label htmlFor="step">Step:</label>
      <input
        type="number"
        id="step"
        name="step"
        min="1"
        max="5"
        value={step}
        onChange={(e => handleChange('step', e.target.value))}
      />
    </div>
    <div className="frameSize">
      <label htmlFor="frameSize">Frame:</label>
      <input
        type="number"
        id="frameSize"
        name="frameSize"
        min="1"
        max="5"
        value={frameSize}
        onChange={(e => handleChange('frameSize', e.target.value))}
      />
    </div>
    <div className="changeWidth">
      <label htmlFor="changeWidth">Width:</label>
      <input
        type="number"
        id="changeWidth"
        name="changeWidth"
        min="50"
        max="130"
        value={itemWidth}
        onChange={(e => handleChange('itemWidth', e.target.value))}
      />
    </div>
    <div className="animation">
      <label htmlFor="animation">Duration:</label>
      <input
        type="number"
        id="animation"
        name="animation"
        min="0"
        max="3000"
        step="250"
        value={animationDuration}
        onChange={(e => handleChange('animationDuration', e.target.value))}
      />
    </div>
    <div className="infinite">
      <label htmlFor="infinite">Infinite:</label>
      <input
        type="checkbox"
        id="infinite"
        name="infinite"
        className="checkbox"
        onChange={(e => handleChange('infinite'))}
      />
    </div>
  </div>
);

CarouselSettings.propTypes = {
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
