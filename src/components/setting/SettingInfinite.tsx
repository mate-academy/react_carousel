import React from 'react';

type Props = {
  title: string;
  type: string;
  id: string;
  handleChange: () => void;
};

export const SettingInfinite: React.FC<Props> = ({
  title,
  type,
  id,
  handleChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="
        Carousel__settings--title
        d-flex
        flex-row
        justify-content-between"
    >
      {title}
      <input
        type={type}
        id={id}
        onClick={() => {
          handleChange();
        }}
        className="Carousel__settings--checkbox form-check-input"
      />
    </label>
  );
};
