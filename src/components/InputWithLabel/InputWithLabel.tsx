import React from 'react';
import { InputWithLabelProps } from './types';

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  ...inputProps
}) => {
  return (
    <>
      <label htmlFor={inputProps.id}>{label}</label>
      <input {...inputProps} min={1} type="number" />
    </>
  );
};
