import { FC, ChangeEvent } from 'react';

import './CheckBox.scss';

type Props = {
  infinite: boolean;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBox: FC<Props> = ({ infinite, changeHandler }) => {
  return (
    <label htmlFor="checkbox">
      {'Infinite: '}
      <input
        type="checkbox"
        className="CheckBox"
        name="checkbox"
        checked={infinite}
        onChange={changeHandler}
      />
    </label>
  );
};
