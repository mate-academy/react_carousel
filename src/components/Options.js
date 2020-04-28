import React from 'react';

const Options = ({ selectOption }) => (
  selectOption.map(value => (
    <option
      value={value}
      key={value}
    >
      {`${value}`}
    </option>
  ))
);

export default Options;
