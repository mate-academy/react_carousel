import React from 'react';

type Props = {
  name: string,
  min: number,
  max: number,
  step: number,
  defaultValue: number,
  onChange: (value: number) => void,
};

export const Input: React.FC<Props> = ({
  name,
  min,
  max,
  step,
  defaultValue,
  onChange,
}) => {
  return (
    <label htmlFor={name}>
      {`set ${name}`}
      <input
        id={name}
        type="range"
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        onChange={(event) => {
          onChange(+event.target.value);
        }}
      />
    </label>
  );
};
