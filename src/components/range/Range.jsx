import React from 'react';
import PropTypes from 'prop-types';
import './Range.scss';

export default class Range extends React.Component {
  render() {
    const { min, max, value, action } = this.props;

    return (
      <input
        type="range"
        max={max}
        min={min}
        value={value}
        onChange={event => action(event)}
      />
    );
  }
}

Range.propTypes = {
  max: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
}
