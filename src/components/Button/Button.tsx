import './Button.scss';

type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  'data-cy'?: string;
};

export const Button: React.FC<Props> = ({
  label,
  onClick,
  disabled = false,
  'data-cy': dataCy,
}) => {
  return (
    <button
      type="button"
      className="button"
      onClick={onClick}
      disabled={disabled}
      data-cy={dataCy}
    >
      {label}
    </button>
  );
};
