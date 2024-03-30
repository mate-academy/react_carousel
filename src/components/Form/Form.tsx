import { FormProps } from './types';
import { InputWithLabel } from '../InputWithLabel/InputWithLabel';
import { FormEvent } from 'react';
import './Form.scss';
import React from 'react';

export const Form: React.FC<FormProps> = ({ inputs, onChange }) => {
  const changeEventHandler = (e: FormEvent) => {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      const inputElement = e.target;

      onChange(inputElement.name, +inputElement.value);
    }
  };

  return (
    <form className="Form" onChange={changeEventHandler}>
      {inputs.map(inputData => (
        <InputWithLabel key={inputData.id} {...inputData} />
      ))}
    </form>
  );
};
