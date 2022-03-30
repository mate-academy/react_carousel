export const Input: React.FC<Props> = ({
  name,
  defaultValue,
  min,
  max,
  step,
  onChange,
}) => {
  return (
    <label htmlFor={name}>
      {`Set ${name}`}
      <input
        id={name}
        type="range"
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        onChange={(event) => {
          onChange(+event.target.value);
        }}
      />
    </label>
  );
};

type Props = {
  name: string,
  defaultValue: number,
  min: number,
  max: number,
  step: number,
  onChange: (value: number) => void
};
