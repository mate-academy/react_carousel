import React from 'react';
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class MainForm extends React.Component {
  state = {
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    step: 3,
    infinite: false,
  }

  handleSubmit = (event) => {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      step,
      infinite,
    } = this.state;
    const counter = +frameSize;

    event.preventDefault();
    this.props.param(
      frameSize,
      itemWidth,
      animationDuration,
      step,
      infinite,
      counter,
    );
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // eslint-disable-next-line no-nested-ternary
    this.setState({ [name]: type === 'checkbox'
      ? checked : type === 'text' ? value : +value });
  }

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      step,
      infinite,
    } = this.state;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="mainForm"
      >
        <h2>Edit properties</h2>
        <label htmlFor="frameSize">FrameSize </label>
        <input
          id="frameSize"
          name="frameSize"
          type="number"
          placeholder="frameSize"
          value={frameSize}
          onChange={this.handleChange}
        />
        <label htmlFor="itemWidth">itemWidth </label>
        <input
          id="itemWidth"
          name="itemWidth"
          type="number"
          placeholder="itemWidth"
          value={itemWidth}
          onChange={this.handleChange}
        />
        <label htmlFor="animationDuration">animationDuration </label>
        <input
          id="animationDuration"
          name="animationDuration"
          type="number"
          placeholder="animationDuration"
          value={animationDuration}
          onChange={this.handleChange}
        />
        <label htmlFor="step">step </label>
        <input
          id="step"
          name="step"
          type="number"
          placeholder="step"
          value={step}
          onChange={this.handleChange}
        />
        <div className="infiniteInput">
          <label htmlFor="infinite">infinite </label>
          <input
            id="infinite"
            name="infinite"
            type="checkbox"
            placeholder="infinite"
            value={infinite}
            onChange={this.handleChange}
          />
        </div>
        <Button
          type="submit"
          variant="success"
        >
          Rebuild
        </Button>
      </Form>
    );
  }
}

MainForm.propTypes = {
  param: PropTypes.func.isRequired,
};
