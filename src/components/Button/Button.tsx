import React from 'react';

interface Props {
  type: string;
  data: string;
  handleButton: () => void;
  isDisabled: boolean;
}
export const Button: React.FC<Props> = ({
  type,
  data,
  handleButton,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      data-cy={data}
      className="btn btn-light"
      onClick={handleButton}
      disabled={isDisabled}
    >
      {type}
    </button>
  );
};
