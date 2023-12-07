import { Component } from 'react';
import { FormProps } from '../types';
import './Form.scss';

export class Form extends Component<FormProps, {}> {
  state = {};

  render() {
    const { images } = this.props;

    return (
      <form>
        <label htmlFor="step">
          Step
          <input
            name="step"
            type="number"
            min={1}
            max={images.length}
            defaultValue={1}
            onChange={this.props.handleStepChange}
          />
        </label>

        <label htmlFor="frameSize">
          Frame size
          <input
            name="frameSize"
            type="number"
            min={1}
            max={images.length}
            defaultValue={3}
            onChange={this.props.handleStepChange}
          />
        </label>

        <label htmlFor="itemWidth">
          Item Width
          <input
            name="itemWidth"
            type="number"
            min={50}
            step={10}
            max={300}
            defaultValue={130}
            onChange={this.props.handleStepChange}
          />
        </label>

        <label htmlFor="animationDuration">
          Animation Duration
          <input
            name="animationDuration"
            type="number"
            min={0}
            step={250}
            max={5000}
            defaultValue={1000}
            onChange={this.props.handleStepChange}
          />
        </label>

        <label htmlFor="infinite">
          Infinite
          <input
            name="infinite"
            type="checkbox"
            // defaultValue={500}
            onChange={this.props.handleStepChange}
          />
        </label>
      </form>
    );
  }
}
