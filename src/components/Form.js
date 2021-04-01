import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    step: this.props.step,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    frameSize: this.props.frameSize,
  }

  handleChangeStep = (e) => {
    this.setState({ step: e.target.value });
  }

  handleChangeitemWidth = (e) => {
    this.setState({ itemWidth: e.target.value });
  }

  handleChangeanimationDuration = (e) => {
    this.setState({ animationDuration: e.target.value });
  }

  handleChangeinfinite = (e) => {
    this.setState({ infinite: e.target.checked });
  }

  handleChangeframeSize = (e) => {
    this.setState({ frameSize: e.target.value });
  }

  render() {
    return (
      <div className="field">
        <label className="label" htmlFor="size">Frame size</label>
        <input
          id="size"
          className="input"
          type="number"
          placeholder="Choose it"
          value={this.state.frameSize}
          onChange={this.handleChangeframeSize}
        />
        <label className="label" htmlFor="width">Item width</label>
        <input
          id="width"
          className="input"
          type="number"
          placeholder="Choose it"
          value={this.state.itemWidth}
          onChange={this.handleChangeitemWidth}
        />
        <label className="label" htmlFor="step">Step</label>
        <input
          id="step"
          className="input"
          type="number"
          placeholder="Choose it"
          value={this.state.step}
          onChange={this.handleChangeStep}
        />
        <label className="label" htmlFor="duration">Animation duration</label>
        <input
          id="duration"
          className="input"
          type="number"
          placeholder="Choose it"
          value={this.state.animationDuration}
          onChange={this.handleChangeanimationDuration}
        />
        <label className="label" htmlFor="Infinite">
          Infinite
          <input
            type="checkbox"
            id="Infinite"
            className="checkbox"
            checked={this.state.Infinite}
            onChange={this.handleChangeinfinite}
          />
        </label>
        <input
          className="button is-warning"
          type="submit"
          onClick={() => {
            this.props.updateData({
              frameSize: this.state.frameSize,
              itemWidth: this.state.itemWidth,
              step: this.state.step,
              infinite: this.state.infinite,
              animationDuration: this.state.animationDuration,
            });
          }}
          value="Change"
        />
      </div>
    );
  }
}

Form.propTypes = {
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  frameSize: PropTypes.number.isRequired,
  updateData: PropTypes.func.isRequired,
};
