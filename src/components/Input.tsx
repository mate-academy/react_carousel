import React from 'react';

type Props = {
  labelFor: string,
  name: string,
  value: string,
  type: string,
  method: (value: string) => void,
};

export const Input: React.FC<Props> = ({
  labelFor,
  name,
  type,
  value,
  method,
}) => {
  return (
    <>
      <label htmlFor={labelFor}>{name}</label>
      <input
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
