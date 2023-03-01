import { useState } from 'react';
import './Form.scss';

const getRandomId = () => String(Math.random()).slice(2);

type Props = {
  name: string,
  value: number,
  label?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export const FormField: React.FC<Props> = ({
  name,
  value,
  label,
  onChange,
}) => {
  const [id] = useState(`${name} - ${getRandomId}`);

  return (
    <div className="Form__field-container">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          className="Form__field-text"
          id={id}
          type="number"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
