import React from 'react';

type Props = {
  hasError: boolean,
  placeholder: string,
  labelText: string,
  inputName: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const TextInput: React.FC<Props> = ({
  placeholder,
  labelText,
  inputName,
  hasError,
  onChange,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={inputName}>{labelText}</label>

      <div className="control">
        <input
          onChange={(event) => onChange(event)}
          name={inputName}
          className="input"
          type="text"
          placeholder={placeholder}
        />
      </div>
      {hasError
        && <p className="help is-danger">{`Invalid ${labelText.toLowerCase()}`}</p>}
    </div>
  );
};
