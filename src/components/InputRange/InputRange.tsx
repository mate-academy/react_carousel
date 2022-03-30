import React from 'react';

interface Props {
  id: string,
  value: number,
  max: number,
  min?: number,
  step?: number,
  callback: (value: number, stateName: string) => void;
}

export const InputRange: React.FC<Props> = ({
  id, value, max, min, step, callback,
}) => {
  return (
    <label htmlFor={id}>
      <input
        type="range"
        id={id}
        name={id}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={({ target }) => {
          callback(+target.value, target.name);
        }}
      />
    </label>
  );
};

InputRange.defaultProps = {
  step: 1,
  min: 1,
};
