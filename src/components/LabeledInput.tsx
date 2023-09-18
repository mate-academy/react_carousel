/* eslint-disable react/require-default-props */
import './LabeledInput.scss';

type InputProps = {
  name: string;
  label:string;
  value: string | number;
  type?: string;
  min?: number;
  max?: number;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const LabeledInput = ({
  type = 'number',
  name,
  label,
  ...props
}: InputProps) => {
  return (
    <label className="label">
      {label}
      :
      <input
        type={type}
        id={name}
        name={name}
        {...props}
      />
    </label>

  );
};
