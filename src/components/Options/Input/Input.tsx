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

    if (name === 'Step') {
      if (val >= 0 && val <= 5) {
        setError(false);
        handleChange(e);
      } else {
        setError(true);
      }
    } else if (name === 'Frame size') {
      if (val >= 0 && val <= 5) {
        setError(false);
        handleChange(e);
      } else {
        setError(true);
      }
    } else if (name === 'Item width') {
      if (val >= 0) {
        setError(false);
        handleChange(e);
      } else {
        setError(true);
      }
    } else if (name === 'Animation duration') {
      if (val >= 0) {
        setError(false);
        handleChange(e);
      } else {
        setError(true);
      }
    } else {
      handleChange(e);
    }
  };

  if (type === 'number') {
    return (
      <label
        htmlFor={`${id}Id`}
        className={`Options__label${error ? ' Options__error' : ''}`}
      >
        {name}
        :
        <input
          className="Options__input"
          onChange={(e) => dimensionChecks(e)}
          placeholder={value.toString()}
          type={type}
          name={name}
          id={`${id}Id`}
        />
      </label>
    );
  }

  if (type === 'boolean') {
    return (
      <label
        htmlFor={`${id}Id`}
        className="Options__label"
      >
        Infinite:
        <input
          className="Options__input"
          onChange={(e) => dimensionChecks(e)}
          checked={value as boolean}
          type="checkbox"
          name="inf"
          id={`${id}Id`}
        />
      </label>
    );
  }

  return <></>;
};
