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

  render() {
    const { step, itemWidth, animationDuration, infinite, frameSize }
      = this.state;

    return (
      <div className="field">
        <label className="label" htmlFor="size">Frame size</label>
        <input
          id="size"
          className="input"
          type="number"
          placeholder="Choose it"
          value={frameSize}
          onChange={e => this.setState({ frameSize: e.target.value })}
        />
        <label className="label" htmlFor="width">Item width</label>
        <input
          id="width"
          className="input"
          type="number"
          placeholder="Choose it"
          value={itemWidth}
          onChange={e => this.setState({ itemWidth: e.target.value })}
        />
        <label className="label" htmlFor="step">Step</label>
        <input
          id="step"
          className="input"
          type="number"
          placeholder="Choose it"
          value={step}
          onChange={e => this.setState({ step: e.target.value })}
        />
        <label className="label" htmlFor="duration">Animation duration</label>
        <input
          id="duration"
          className="input"
          type="number"
          placeholder="Choose it"
          value={animationDuration}
          onChange={e => this.setState({ animationDuration: e.target.value })}
        />
        <label className="label" htmlFor="Infinite">
          Infinite
          <input
            type="checkbox"
            id="Infinite"
            className="checkbox"
            checked={infinite}
            onChange={e => this.setState({ infinite: e.target.checked })}
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
