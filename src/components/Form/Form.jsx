import React from 'react';
import './Form.scss';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  }

  handleChange = (event) => {
    const {
      name,
      value,
      checked,
    } = event.target;

    this.setState({
      [name]: value,
      infinite: checked,
    });
  }

  callbeckParams = (e, param) => {
    e.preventDefault();
    const counter = this.state.frameSize;

    param(
      +this.state.frameSize,
      +this.state.itemWidth,
      +this.state.animationDuration,
      +this.state.step,
      this.state.infinite,
      +counter,
    );
  }

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      step,
    } = this.state;
    const { handleChange, callbeckParams } = this;
    const { param } = this.props;

    return (
      <form
        className="form-block"
      >
        <h2 className="form-block__title">Customize</h2>
        <label className="form-block__label" htmlFor="size">
          Frame size
          <input
            className="form-block__input"
            id="size"
            name="frameSize"
            value={frameSize}
            type="number"
            onChange={handleChange}
          />
        </label>
        <label className="form-block__label" htmlFor="width">
          Item width
          <input
            className="form-block__input"
            id="width"
            name="itemWidth"
            value={itemWidth}
            type="number"
            onChange={handleChange}
          />
        </label>
        <label className="form-block__label" htmlFor="step">
          Step
          <input
            className="form-block__input"
            id="step"
            name="step"
            type="number"
            value={step}
            onChange={handleChange}
          />
        </label>
        <label className="form-block__label" htmlFor="duration">
          Animation duration
          <input
            className="form-block__input"
            id="duration"
            name="animationDuration"
            value={animationDuration}
            type="number"
            onChange={handleChange}
          />
        </label>
        <label className="form-block__infinite" htmlFor="infinite">
          <span>Infinite</span>
          <input
            id="infinite"
            type="checkbox"
            onChange={handleChange}
          />
        </label>

        <button
          className="form-block__btn"
          type="submit"
          onClick={(e) => {
            callbeckParams(e, param);
          }}
        >
          change data
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  param: PropTypes.func.isRequired,
};
