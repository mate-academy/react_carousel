import React from 'react';
import PropTypes from 'prop-types';

export const CarouselSettings = ({
  onChange, step, frameSize, itemWidth, animationDuration,
}) => (
  <form className="App__form">
    <div className="App__form-field">
      <label htmlFor="step">Step</label>
      <input
        type="number"
        id="step"
        name="step"
        value={step}
        min="1"
        max="10"
        onChange={onChange}
      />
    </div>

    <div className="App__form-field">
      <label htmlFor="frameSize">Frame Size</label>
      <input
        type="number"
        id="frameSize"
        name="frameSize"
        value={frameSize}
        min="1"
        max="10"
        onChange={onChange}
      />
    </div>

    <div className="App__form-field">
      <label htmlFor="itemWidth">Item Width</label>
      <input
        type="number"
        id="itemWidth"
        name="itemWidth"
        value={itemWidth}
        min="30"
        max="300"
        onChange={onChange}
      />
    </div>

    <div className="App__form-field">
      <label htmlFor="animationDuration">Animation Duration</label>
      <input
        type="number"
        name="animationDuration"
        id="animationDuration"
        value={animationDuration}
        min="0"
        max="3000"
        onChange={onChange}
      />
    </div>
  </form>
);

CarouselSettings.propTypes = {
  onChange: PropTypes.func.isRequired,
  itemWidth: PropTypes.number,
  frameSize: PropTypes.number,
  step: PropTypes.number,
  animationDuration: PropTypes.number,
};

CarouselSettings.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
};
