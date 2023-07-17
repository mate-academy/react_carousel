import React from 'react';
import { Value } from '../types/Values';

type Props = {
  labelFor: string,
  name: string,
  value: string,
  type: string,
  max: string,
  method: (value: Value) => void,
};

export const Input: React.FC<Props> = ({
  labelFor,
  name,
  type,
  value,
  max,
  method,
}) => {
  return (
    <>
      <label htmlFor={labelFor}>{name}</label>
      <input
        min="0"
        max={max}
        name={name}
        type={type}
        id={labelFor}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          method({
            value: e.target.value,
            type: name,
          });
        }}
      />
    </>
  );
};
