import React from 'react';
import './Input.scss';

type Props = {
  name: string,
  min: number,
  max: number,
  step: number,
  defaultValue: number,
  onChange: (value: HTMLInputElement) => void,
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
      <label htmlFor={name === 'width' ? 'itemId' : `${name}Id`}>{`Set ${name}: `}</label>
      <input
        type="number"
        name={name}
        id={name === 'width' ? 'itemId' : `${name}Id`}
        step={step}
        min={min}
        max={max}
        className="Inputs__item"
        defaultValue={defaultValue}
        onChange={(event) => {
          onChange(event.target);
        }}
      />
    </>
  );
};
