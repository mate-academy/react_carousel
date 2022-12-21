import { FC, ChangeEvent, useState } from 'react';

import './Input.scss';

type Props = {
  label: string;
  option: number;
};

export const Input: FC<Props> = ({ label, option }) => {
  const [value, setValue] = useState(option);
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || Number.isNaN(+event.target.value)) {
      setValue(0);
    }

    setValue(+event.target.value);
  };

  return (
    <label className="Input__label" htmlFor={label}>
      {label}
      <input type="text" value={value} onChange={changeHandler} />
    </label>
  );
};
