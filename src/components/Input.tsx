type Props = {
  name: string,
  className: string,
  min: number,
  max: number,
  step: number,
  defaultValue: number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => number | void
};

export const Input: React.FC<Props> = ({
  name,
  min,
  max,
  step,
  defaultValue,
  onChange,
}) => {
  return (
    <label htmlFor={name}>
      {`${name}`}
      <input
        id={name}
        className="Inputs__input"
        type="number"
        defaultValue={defaultValue}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
      />
    </label>
  );
};
