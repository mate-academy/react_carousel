import React from 'react';

type Props = {
  labelFor: string,
  name: string,
  value: string,
  type: string,
  max: string,
  method: (value: string) => void,
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
        type={type}
        id={labelFor}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          method(e.target.value);
        }}
      />
    </>
  );
};
