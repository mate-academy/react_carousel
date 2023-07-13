import React from 'react';

type Props = {
  labelFor: string,
  name: string,
  value: string,
  type: string,
  method: (value: string) => void,
  // changeState: () => void,
};

export const Input: React.FC<Props> = ({
  labelFor,
  name,
  type,
  value,
  method,
  // changeState,
}) => {
  return (
    <>
      <label htmlFor={labelFor}>{name}</label>
      <input
        min="0"
        type={type}
        id={labelFor}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          method(e.target.value);
          // changeState();
        }}
      />
    </>
  );
};
