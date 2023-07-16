import './InputField.scss';

type Props = {
  forId: string;
  type: string;
  text: string;
  step: number;
  value: number;
  setValue: (value: number) => void;
};

export const InputField: React.FC<Props> = ({
  forId,
  type,
  text,
  step,
  value,
  setValue,
}) => (
  <label htmlFor={forId} className="label">
    {text}
    <input
      type={type}
      id={forId}
      step={step}
      value={value}
      onChange={(e) => setValue(+e.target.value)}
    />
  </label>
);
