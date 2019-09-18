import React from 'react';
import './Checkbox.scss';
import { CheckboxTypes } from '../../constants/proptypes';

const Checkbox = ({
  label,
  name,
  type,
  onClick,
}) => (
  <label className="label" htmlFor={name}>
    {label}
    <input
      className="input"
      id={name}
      name={name}
      type={type}
      onClick={e => onClick(e)}
    />
  </label>
);

Checkbox.propTypes = CheckboxTypes;

export default Checkbox;
