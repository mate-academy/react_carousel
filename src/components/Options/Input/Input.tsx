import React, { useState } from 'react';

type Props = {
  props: {
    type: 'number' | 'boolean';
    name: string;
    id: string;
    value: number | boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
};

export const Input = ({ props }: Props) => {
  const [error, setError] = useState(false);

  const {
    type,
    name,
    id,
    value,
    handleChange,
  } = props;

  const dimensionChecks = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = parseInt(e.target.value, 10);

    switch (name) {
      case 'Step':
        if (val >= 0 && val <= 5) {
          setError(false);
          handleChange(e);
        } else {
          setError(true);
        }

        break;
      case 'Frame size':
        if (val >= 0 && val <= 5) {
          setError(false);
          handleChange(e);
        } else {
          setError(true);
        }

        break;
      case 'Item width':
        if (val >= 0) {
          setError(false);
          handleChange(e);
        } else {
          setError(true);
        }

        break;
      case 'Animation duration':
        if (val >= 0) {
          setError(false);
          handleChange(e);
        } else {
          setError(true);
        }

        break;
      default:
        handleChange(e);
    }
  };

  const errorClass = error ? ' Options__error' : '';
  const className = type === 'number'
    ? `Options__label${errorClass}`
    : 'Options__label';

  const input = type === 'number'
    ? (
      <input
        className="Options__input"
        onChange={(e) => dimensionChecks(e)}
        placeholder={value.toString()}
        type={type}
        name={name}
        id={`${id}Id`}
      />
    ) : (
      <input
        className="Options__input"
        onChange={(e) => dimensionChecks(e)}
        checked={value as boolean}
        type="checkbox"
        name="inf"
        id={`${id}Id`}
      />
    );

  return (['boolean', 'number'].includes(type) && (
    <label
      htmlFor={`${id}Id`}
      className={className}
    >
      {name}
      :
      {input}
    </label>
  )) || null;
};
