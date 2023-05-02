/* eslint-disable react/require-default-props */
import './Input.scss';

type InputProps = {
  name: string;
  label:string;
  value: string | number;
  type?: string;
  min?: number;
  max?: number;
  checked?: boolean;
  onChange: (name: string, value: boolean | number) => void
};

export const Input = ({
  type = 'number',
  name,
  max = 200,
  label,
  min = 1,
  value,
  onChange,
  checked = false,
}: InputProps) => {
  return (
    <div className="input">
      <label htmlFor={name}>
        {label}
        :
        {' '}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const data = type === 'number'
            ? +e.target.value
            : e.target.checked;

          onChange(name, data);
        }}
        checked={checked}
      />
    </div>
  );
};
