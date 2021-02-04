import React from 'react';
import PropTypes from 'prop-types';

import './CarouselSettings.scss';

class CarouselSettings extends React.Component {
  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
      editDuration,
      editSize,
      editStep,
      editWidth,
    } = this.props;

    return (
  <div className="settings">
  <div className="item-width">
    <label htmlFor="width">Item width</label>
    <br />
    <input
      id="width"
      type="number"
      name="width"
      placeholder={`${itemWidth}`}
      onChange={editWidth}
    />
  </div>
  <div className="frame-size">
    <label htmlFor="size">Carousel size</label>
    <br />
    <input
      id="size"
      type="number"
      name="size"
      min={1}
      max={10}
      placeholder={`${frameSize}`}
      onChange={editSize}
    />
  </div>
  <div className="step">
    <label htmlFor="step">Step</label>
    <br />
    <input
      id="step"
      type="number"
      name="step"
      placeholder={`${step}`}
      onChange={editStep}
    />
  </div>
  <div className="duration">
    <label htmlFor="duration">Duration</label>
    <br />
    <input
      id="duration"
      type="number"
      name="duration"
      placeholder={`${animationDuration}`}
      onChange={editDuration}
    />
  </div>
</div>
    )
}
}

CarouselSettings.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default CarouselSettings;