import { FC } from 'react';

import './CheckBox.scss';

export const CheckBox: FC = () => {
  return (
    <label htmlFor="checkbox">
      {'Infinite: '}
      <input
        type="checkbox"
        className="CheckBox"
        name="checkbox"
      />
    </label>
  );
};
