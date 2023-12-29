import React from 'react';
import './Input.scss';

type Props = {
  label: string,
  type: string,
  value: number,
  onChange: (val: number) => void,
  min: number,
  max: number,
  step: number,
};

export const Input: React.FC<Props> = ({
  label,
  type,
  value,
  onChange,
  min,
  max,
  step,
}) => {
  return (
    <label>
      {label}

      <input
        type={type}
        defaultValue={value}
        onChange={(event) => onChange(+event.target.value)}
        className="input"
        min={min}
        max={max}
        step={step}
      />
    </label>
  );
};
