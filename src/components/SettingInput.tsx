interface SettingInputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: number | boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingInput: React.FC<SettingInputProps> = ({
  id,
  label,
  type,
  name,
  value,
  min,
  max,
  step = 1,
  onChange,
}) => (
  <div className="settings__wrapper">
    <label htmlFor={id}>{label}</label>

    <input
      id={id}
      type={type}
      name={name}
      {...(type === 'checkbox'
        ? { checked: Boolean(value) }
        : { value: value.toString() })}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  </div>
);

export default SettingInput;
