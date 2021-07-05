import React from 'react';
import './Control.scss';
import PropTypes from 'prop-types';

const Control = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  mainComponent,
}) => (
  <div className="Control">
    <div className="Control__step">
      Step:
      <input
        type="number"
        defaultValue={step}
      />
    </div>
    <div className="Control__frameSize">
      Frame size:
      <input
        type="number"
        defaultValue={frameSize}
      />
    </div>
    <div className="Control__itemWidth">
      Item width:
      <input
        type="number"
        defaultValue={itemWidth}
      />
    </div>
    <div className="Control__animationDuration">
      Animation duration (ms):
      <input
        type="number"
        defaultValue={animationDuration}
      />
    </div>

    <button
      type="submit"
      onClick={() => {
        mainComponent.setState({
          properties: {
            step: document
              .querySelector('.Control__step > input').value,
            frameSize: document
              .querySelector('.Control__frameSize > input').value,
            itemWidth: document
              .querySelector('.Control__itemWidth > input').value,
            animationDuration: document
              .querySelector('.Control__animationDuration > input').value,
          },
        });
      }}
    >
      Apply
    </button>
  </div>
);

Control.propTypes = {
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  mainComponent: PropTypes.objectOf(
    PropTypes.shape(),
  ).isRequired,
};

export default Control;
