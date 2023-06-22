import { FC } from 'react';
import { InputType } from '../Types';

export const Input: FC<InputType> = ({
  changeState,
  type,
  step,
  min,
  max,
  dataName,
  children,
  value,
}) => (
  <label>
    {`${children}: `}
    <input
      type={type}
      step={step}
      max={max}
      min={min}
      data-name={dataName}
      value={value}
      onChange={({ target }) => {
        const { dataset, valueAsNumber, checked } = target;

        changeState(dataset.name, valueAsNumber, checked);
      }}
    />
  </label>
);
