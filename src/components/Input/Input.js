import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({
  label,
  name,
  type,
  onChange,
  onClick,
  onBlur,
}) => (
  <label className="label" htmlFor={name}>
    {label}
    <input
      className="input"
      id={name}
      name={name}
      type={type}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
    />
  </label>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  onChange: undefined,
  onClick: undefined,
  onBlur: undefined,
};

export default Input;
