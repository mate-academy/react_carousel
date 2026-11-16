import React, { HTMLInputTypeAttribute } from 'react';
import { InputStyled, Label } from './Inputs.styles';

type ValueOfDates = string | number | boolean;

interface Props {
  id: string;
  type?: HTMLInputTypeAttribute;
  value: ValueOfDates;
  label?: string;
  onChange: (value: ValueOfDates) => void;
}

export const Input = (props: Props) => {
  const { id, type, value, label, onChange } = props;
  const isCheckBox = type === 'checkbox';

  return (
    <Label htmlFor={id}>
      {label}
      <InputStyled
        id={id}
        type={type}
        checked={isCheckBox ? Boolean(value) : undefined}
        value={!isCheckBox ? (value as string | number) : undefined}
        onChange={e => {
          if (isCheckBox) {
            onChange(e.target.checked);
          } else {
            onChange(e.target.value);
          }
        }}
      />
    </Label>
  );
};
