import React from 'react';
import './Input.scss';

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
  step,
  min,
  max,
  defaultValue,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={`${name}Id`}>{`Set ${name}: `}</label>
      <input
        type="number"
        name={name}
        id={`${name}Id`}
        step={step}
        min={min}
        max={max}
        className="Inputs__item"
        defaultValue={defaultValue}
        onChange={(e) => {
          onChange(+e.target.value);
        }}
      />
    </>
  );
};
