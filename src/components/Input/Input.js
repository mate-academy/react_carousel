import React from 'react';
import './Input.scss';
import { InputTypes } from '../../constants/proptypes';

const Input = ({
  label,
  name,
  type,
  onChange,
}) => (
  <label className="label" htmlFor={name}>
    {label}
    <input
      className="input"
      id={name}
      name={name}
      type={type}
      onBlur={e => onChange(e)}
    />
  </label>
);

Input.propTypes = InputTypes;

export default Input;
