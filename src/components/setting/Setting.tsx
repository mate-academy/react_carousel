import React from 'react';

type Props = {
  title: string;
  type: string;
  id: string;
  min: number;
  step: string;
  defaultValue: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Setting: React.FC<Props> = ({
  title,
  type,
  id,
  min,
  step,
  defaultValue,
  handleChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="Carousel__settings--title d-flex flex-column"
    >
      {title}
      <input
        type={type}
        id={id}
        min={min}
        step={step}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="Carousel__settings--property mb-2"
      />
    </label>
  );
};
