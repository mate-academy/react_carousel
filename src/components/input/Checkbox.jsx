import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

export default class Checkbox extends React.Component {
  render() {
    const { action } = this.props;

    return (
      <label>
        Infinity:
        <input
          type="checkbox"
          onChange={action}
        />
      </label>
    );
  }
}

Checkbox.propTypes = {
  action: PropTypes.func.isRequired,
}
