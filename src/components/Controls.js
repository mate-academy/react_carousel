import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({
  handleChange, infinite, frameSize, step, animationDuration, itemWidth,
}) => (
  <div className="Controls">
    <div className="Controls">
      <h2>Item width</h2>

      <button
        type="button"
        name="minusTenWidth"
        onClick={handleChange}
      >
        -10
      </button>

      <input
        type="text"
        name="itemWidth"
        onChange={handleChange}
        value={itemWidth}
      />

      <button
        type="button"
        name="plusTenWidth"
        onClick={handleChange}
      >
        +10
      </button>
    </div>

    <div>
      <h2>Animation Duration</h2>

      <button
        type="button"
        name="minusTenAnimate"
        onClick={handleChange}
      >
        -100
      </button>

      <input
        type="text"
        name="animationDuration"
        onChange={handleChange}
        value={animationDuration}
      />

      <button
        type="button"
        name="plusTenAnimate"
        onClick={handleChange}
      >
        +100
      </button>
    </div>

    <div className="button-container">
      <button
        name="minusStep"
        type="button"
        onClick={handleChange}
      >
        - Step
      </button>

      <h2>
        Flip Step:
        {step}
      </h2>

      <button
        name="plusStep"
        type="button"
        onClick={handleChange}
      >
        + Step
      </button>
    </div>

    <div className="button-container">
      <button
        name="minusElement"
        type="button"
        onClick={handleChange}
      >
        - Element
      </button>

      <h2>
        FrameSize:
        {frameSize}
      </h2>

      <button
        name="plusElement"
        type="button"
        onClick={handleChange}
      >
        + Element
      </button>
    </div>

    <label htmlFor="infinite-id">
      <input
        type="checkbox"
        name="infinite"
        onChange={handleChange}
        value={infinite}
        id="infinite-id"
      />
      is Infinite
    </label>
  </div>
);

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  infinite: PropTypes.bool.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default Controls;
