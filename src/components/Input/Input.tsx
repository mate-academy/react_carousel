import React from 'react';

interface Props {
  name: string;
  id: string;
  min: number;
  step: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const Input: React.FC<Props> = ({
  name,
  id,
  min,
  step,
  max,
  value,
  onChange,
}) => {
  return (
    <input
      type="number"
      className="Carousel__input"
      name={name}
      id={id}
      min={min}
      step={step}
      max={max}
      value={value}
      onChange={event => onChange(Number(event.target.value))}
    />
  );
};
