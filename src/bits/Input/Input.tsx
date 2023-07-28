import React from 'react';
import './Input.scss';

type InputType = 'number' | 'checkbox';

type Props = {
  type: InputType;
  id?: string;
  title: string;
  max?: number;
  min?: number;
  placeholder?: string;
  initialValue: number | boolean;
  step?: number;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  id,
  title,
  onChangeHandler,
  placeholder,
  type,
  initialValue,
  step,
  max,
  min,
}) => {
  return (
    <div className="input">
      <label
        className="input__label"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        type={type}
        value={+initialValue}
        className="input__field"
        id={id}
        onChange={onChangeHandler}
        placeholder={placeholder}
        step={step}
        max={max}
        min={min}
      />
    </div>
  );
};

Input.defaultProps = {
  id: '',
  max: 5,
  min: 1,
  placeholder: '',
  step: 1,
  onChangeHandler: () => {},
};
