import React from 'react';
import './Input.scss';

type Props = {
  labelText: string;
  id: string;
  value: string | number;
  min: string;
  max: string;
  step: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const Input: React.FC<Props> = ({
  labelText,
  id,
  value,
  min,
  max,
  step,
  onChange,
  name,
}) => (
  <label
    htmlFor={id}
    className="Container"
  >
    {labelText}
    <input
      type="number"
      className="Input"
      id={id}
      name={name}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      value={value}
    />
  </label>
);
