/* eslint-disable react/require-default-props */
import './LabeledInput.scss';

type InputProps = {
  label:string;
} & React.HTMLProps<HTMLInputElement>;

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
