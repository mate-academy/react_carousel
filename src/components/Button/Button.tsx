import React from 'react';

interface Props {
  buttonText: string;
  dataTestAttribute: string;
  onClick: () => void;
  isDisabled: boolean;
}
export const Button: React.FC<Props> = ({
  buttonText,
  dataTestAttribute,
  onClick,
  isDisabled,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      data-cy={dataTestAttribute}
      className="btn btn-light"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};
