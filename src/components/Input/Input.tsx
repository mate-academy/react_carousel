import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type HandleFunction = Function;

interface Props {
  label: string;
  name: string
  value: string;
  stepValue: string;
  minValue: string;
  maxValue: string;
  onChange: HandleFunction;
}

export const Input: React.FC<Props> = ({
  label,
  name,
  value,
  stepValue,
  minValue,
  maxValue,
  onChange,
}) => {
  return (
    <div className="field">
      {/* eslint-disable-next-line */}
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          type="number"
          name={name}
          step={stepValue}
          min={minValue}
          max={maxValue}
          value={value}
          onChange={(event) => onChange(event)}
        />
      </div>
    </div>
  );
};
