import React from 'react';

type Props = {
  type: 'number' | 'boolean';
  name: string;
  id: string;
  value: number | boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const Input = (props: Props) => {
  const dimensionChecks = (
    name:string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = parseInt(e.target.value, 10);

    if (name === 'step') {
      if (val >= 0 && val <= 10) {
        props.handleChange(e);
      }
    } else if (name === 'frame') {
      if (val >= 0 && val <= 1300) {
        props.handleChange(e);
      }
    } else if (name === 'item') {
      if (val >= 0) {
        props.handleChange(e);
      }
    } else if (name === 'animationDuration') {
      if (val >= 0) {
        props.handleChange(e);
      }
    } else {
      props.handleChange(e);
    }
  };

  if (props.type === 'number') {
    return (
      <label
        htmlFor={`${props.id}Id`}
        className="Options__label"
      >
        {props.name}
        :
        <input
          className="Options__input"
          onChange={(e) => dimensionChecks(props.name, e)}
          value={props.value as number}
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
