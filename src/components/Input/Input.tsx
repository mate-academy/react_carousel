import React from 'react';
import './Input.scss';

type Props = {
  labelText: string;
  id: string;
  name: string;
  value: string | number;
  min: string;
  max: string;
  step: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  labelText,
  id,
  name,
  value,
  min,
  max,
  step,
  onChange,
}) => (
  <label htmlFor={id}>
    {labelText}
    <input
      className="Input"
      id={id}
      type="number"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  </label>
);
