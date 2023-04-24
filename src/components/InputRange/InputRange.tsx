import './InputRange.scss';

type InputProps = {
  type: 'range';
  id?: string;
  name?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  value?: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputRange: React.FC<InputProps> = ({
  type,
  id,
  name,
  min,
  max,
  step,
  value,
  handleChange,
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
    </>
  );
};
