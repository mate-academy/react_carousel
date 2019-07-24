import React from 'react';
import PropTypes from 'prop-types';

function Customization({
  itemWidth,
  updateState,
  frameSize,
  step,
  animationDuration,
  infinite,
}) {
  return (
    <div className="Carousel__customization">
      <div className="Carousel__customization-item-width customization-item">
        <span>Set width of the image</span>
        <input
          type="range"
          defaultValue="130"
          name="itemWidth"
          step="10"
          min="100"
          max="200"
          onChange={event => updateState(event)}
        />
        <span>{itemWidth}</span>
      </div>

      <div className="Carousel__customization-frame customization-item">
        <span>Set the frame size</span>
        <input
          type="range"
          defaultValue="3"
          name="frameSize"
          step="1"
          min="1"
          max="5"
          onChange={event => updateState(event)}
        />
        <span>{frameSize}</span>
      </div>

      <div className="Carousel__customization-step customization-item">
        <span>Set slide step</span>
        <input
          type="range"
          defaultValue="3"
          name="step"
          step="1"
          min="1"
          max="5"
          onChange={event => updateState(event)}
        />
        <span>{step}</span>
      </div>

      <div className="Carousel__customization-animation customization-item">
        <div>Set the animation duration (in ms)</div>
        <input
          type="text"
          value={animationDuration}
          name="animationDuration"
          onChange={event => updateState(event)}
        />
      </div>

      <div className="Carousel__customization-infinite customization-item">
        <input
          type="checkbox"
          checked={infinite}
          name="infinite"
          onChange={event => updateState(event)}
        />

        <span>Infinite loop</span>
      </div>
    </div>
  );
}

Customization.propTypes = {
  itemWidth: PropTypes.number,
  updateState: PropTypes.func.isRequired,
  frameSize: PropTypes.number,
  step: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
};

Customization.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

export default Customization;
