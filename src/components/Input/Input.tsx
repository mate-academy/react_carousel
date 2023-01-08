import {
  ChangeEvent,
  FC,
} from 'react';

import './Input.scss';

type Props = {
  label: string;
  option: number;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<Props> = ({ label, option, changeHandler }) => {
  return (
    <label className="Input__label" htmlFor={label}>
      {label}
      <input
        type="text"
        value={option}
        onChange={changeHandler}
        name={label.toLowerCase()}
      />
    </label>
  );
};
