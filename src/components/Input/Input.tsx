import { FC } from 'react';
import { InputProps } from '../../types';

import './Input.scss';

export const Input: FC<InputProps> = ({
  value,
  inputId,
  type,
  min,
  max,
  step,
  checked,
  handleChange,
  handleCheck,
  info,
}) => {
  let handler: (arg: string) => void;

  if (handleChange) {
    handler = arg => handleChange(Math.min(Number(arg), Number(max)));
  }

  if (handleCheck) {
    handler = () => handleCheck(state => !state);
  }

  return (
    <label
      htmlFor={inputId}
      className="label"
    >
      {info}
      <input
        type={type}
        id={inputId}
        value={value}
        min={min}
        max={max}
        step={step}
        checked={checked}
        className="input"
        onChange={event => {
          handler(event.target.value);
        }}
      />
    </label>
  );
};
