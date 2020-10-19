import React from 'react';
import PropTypes from 'prop-types';

import './CarouselSettings.scss';

class CarouselSettings extends React.Component {
  state = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    duration: this.props.animationDuration,
  }

  editWidth = (event) => {
    return this.setState({
      itemWidth: event.target.value,
    });
  }

  editSize = (event) => {
    return this.setState({
      frameSize: event.target.value,
    });
  }

  editStep = (event) => {
    return this.setState({
      step: event.target.value,
    });
  }

  editDuration = (event) => {
    return this.setState({
      duration: event.target.value,
    });
  }

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      duration,
    } = this.state;

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
      onChange={this.editWidth}
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
      onChange={this.editSize}
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
      onChange={this.editStep}
    />
  </div>
  <div className="duration">
    <label htmlFor="duration">Duration</label>
    <br />
    <input
      id="duration"
      type="number"
      name="duration"
      placeholder={`${duration}`}
      onChange={this.editDuration}
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