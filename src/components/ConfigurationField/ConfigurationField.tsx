import React from 'react';

type Props = {
  type: string;
  fieldName: string;
  handleEvent: React.ChangeEventHandler<HTMLInputElement>;
};

// eslint-disable-next-line max-len
export const ConfigurationField: React.FC<Props> = ({ type, fieldName, handleEvent }) => {
  return (
    <>
      <label htmlFor={fieldName}>
        {`  ${fieldName.toLocaleUpperCase()}  `}
      </label>
      <input
        type={type}
        name={fieldName}
        onChange={handleEvent}
      />
    </>
  );
};
