import React from 'react';
import './FormInput.scss';

type Props = {
  title: string;
  id: string;
  startValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: React.FC<Props> = ({
  title,
  id,
  startValue,
  onChange,
}) => (
  <label className="FormInput">
    {title}
    <input
      type="number"
      name="carouselParams"
      id={id}
      className="FormInput__field"
      min={0}
      onChange={onChange}
      placeholder={startValue}
    />
  </label>
);
