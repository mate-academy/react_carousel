import React from 'react';
import './InputRadio.scss';

type Props = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  handleRadioChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText: string;
};

const InputRadio: React.FC<Props> = ({
  id,
  name,
  value,
  checked,
  handleRadioChange,
  labelText,
}) => (
  <label htmlFor={id}>
    <div className="inputs__labels-option">{labelText}</div>
    <div className="input__labels-slider">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleRadioChange}
      />
      <span className="checkmark" />
    </div>
  </label>
);

export default InputRadio;
