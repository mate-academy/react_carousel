import React, { useState } from 'react';

type Props = {
  hasError: boolean,
  placeholder: string,
  labelText: string,
  inputName: string,
  inputInitialValue: number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const TextInput: React.FC<Props> = ({
  placeholder,
  labelText,
  inputName,
  hasError,
  inputInitialValue,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(inputInitialValue);

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+event.target.value);
    onChange(event);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={inputName}>{labelText}</label>

      <div className="control">
        <input
          onChange={handleInputChanged}
          name={inputName}
          className="input"
          type="text"
          value={inputValue || ''}
          placeholder={placeholder}
        />
      </div>
      {hasError
        && <p className="help is-danger">{`Invalid ${labelText.toLowerCase()}`}</p>}
    </div>
  );
};
