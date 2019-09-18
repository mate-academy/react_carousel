import React from 'react';
import './Input.scss';
import { InputTypes } from '../../constants/proptypes';

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
      onBlur={
        typeof onBlur === 'undefined'
          ? () => {}
          : e => onBlur(e)
      }
      onChange={
        typeof onChange === 'undefined'
          ? () => {}
          : e => onChange(e)
      }
      onClick={
        typeof onClick === 'undefined'
          ? () => {}
          : e => onClick(e)
      }
    />
  </label>
);

Input.propTypes = InputTypes;

export default Input;
