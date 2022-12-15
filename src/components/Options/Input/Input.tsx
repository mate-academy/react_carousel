import React, {useState}  from 'react';

type Props = {
  type: 'number' | 'boolean';
  name: string;
  id: string;
  value: number | boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const Input = (props: Props) => {
  const [error, setError] = useState(false);

  const dimensionChecks = (
    name:string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = parseInt(e.target.value, 10);

    if (name === 'Step') {
      if (val >= 0 && val <= 5) {
        setError(false);
        props.handleChange(e);
      } else {
        setError(true);
      }
    } else if (name === 'Frame size') {
      if (val >= 0 && val <= 5) {
        setError(false);
        props.handleChange(e);
      } else {
        setError(true);
      }
    } else if (name === 'Item width') {
      if (val >= 0) {
        setError(false);
        props.handleChange(e);
      } else {
        setError(true);
      }
    } else if (name === 'Animation duration') {
      if (val >= 0) {
        setError(false);
        props.handleChange(e);
      } else {
        setError(true);
      }
    } else {
      props.handleChange(e);
    }
  };

  if (props.type === 'number') {
    return (
      <label
        htmlFor={`${props.id}Id`}
        className={`Options__label${error ? ' Options__error' : ''}`}
      >
        {props.name}
        :
        <input
          className="Options__input"
          onBlur={(e) => dimensionChecks(props.name, e)}
          placeholder={props.value.toString()}
          type={props.type}
          name={props.name}
          id={`${props.id}Id`}
        />
      </label>
    );
  }

  if (props.type === 'boolean') {
    return (
      <label
        htmlFor={`${props.id}Id`}
        className="Options__label"
      >
        Infinite:
        <input
          className="Options__input"
          onChange={(e) => dimensionChecks(props.name, e)}
          checked={props.value as boolean}
          type="checkbox"
          name="inf"
          id={`${props.id}Id`}
        />
      </label>
    );
  }

  return <></>;
};
