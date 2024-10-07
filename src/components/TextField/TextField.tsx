import './TextField.scss';
import { ChangeEvent, FC, useState } from 'react';

type Props = {
  id?: string;
  label: string;
  name: string;
  value: number;
  onChange: (value: number | string) => void;
};

export const TextField: FC<Props> = ({ id, label, name, value, onChange }) => {
  const [hasError, setHasError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value.trimStart());

    if (numValue === 0) {
      onChange('');

      return;
    }

    if (!isNaN(numValue)) {
      onChange(numValue);

      if (hasError) {
        setHasError(false);
      }
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="field">
      <div className="field__input">
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" value={value} onChange={handleChange} />
      </div>

      {hasError && <p className="field__error">{`${name} must be a number`}</p>}
    </div>
  );
};
