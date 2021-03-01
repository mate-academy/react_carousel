import React from 'react';
import PropTypes from 'prop-types';

export class CarouselSettings extends React.Component {
  state = {
    change: this.props.change.bind(this),
  }

  render() {
    const { change } = this.state;
    const { frameSize, step, itemWidth, animationDuration } = this.props;

    return (
      <div className="form">
        <label htmlFor="frameSize">
          Frame size:
          <select
            id="frameSize"
            onChange={e => change(e, 'frameSize')}
            defaultValue={frameSize}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </label>

        <label htmlFor="step">
          Step:
          <select
            id="step"
            onChange={e => change(e, 'step')}
            defaultValue={step}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </label>

        <label htmlFor="itemWidth">
          Item Width:
          <select
            id="itemWidth"
            onChange={e => change(e, 'itemWidth')}
            defaultValue={itemWidth}
          >
            <option>50</option>
            <option>90</option>
            <option>130</option>
          </select>
        </label>

        <label htmlFor="animationDuration">
          Animation Duration:
          <select
            id="animationDuration"
            onChange={e => change(e, 'animationDuration')}
            defaultValue={animationDuration}
          >
            <option>1000</option>
            <option>2000</option>
            <option>3000</option>
          </select>
        </label>

        <label htmlFor="infinite">
          Infinite:
          <input
            id="infinite"
            type="checkbox"
            onChange={e => change(e)}
          />
        </label>
      </div>
    );
  }
}

CarouselSettings.propTypes = {
  change: PropTypes.func.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
