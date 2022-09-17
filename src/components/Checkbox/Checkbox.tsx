import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type HandleFunction = Function;

interface Props {
  label: string;
  value: boolean;
  onChecked: HandleFunction;
}

export const Checkbox: React.FC<Props> = ({
  label,
  value,
  onChecked,
}) => {
  return (
    <label className="checkbox has-text-weight-bold">
      <input
        type="checkbox"
        className="mr-2"
        checked={value}
        onChange={(event) => onChecked(event)}
      />
      {label}
    </label>
  );
};
