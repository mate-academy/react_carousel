import { ChangeEvent, FC } from 'react';
import toCamelCase from '../../utils/toCamelCase';

import './Input.scss';

type Props = {
  label: string;
  option: number;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<Props> = ({ label, option, changeHandler }) => {
  const name = toCamelCase(label);

  return (
    <label className="Input__label" htmlFor={label}>
      {label}
      <input
        type="number"
        value={option}
        onChange={changeHandler}
        name={name}
      />
    </label>
  );
};
