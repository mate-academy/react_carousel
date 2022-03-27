import React from 'react';

interface Props {
  id: string;
  step: number;
  range: [number, number];
  defaultValue: number;
  callback: (value: number) => void;
}

const convertToLabel = (id: string): string => {
  return id
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase();
};

export const CarouselSetting: React.FC<Props> = ({
  id,
  defaultValue,
  range,
  step,
  callback,
}) => {
  const convertedId = convertToLabel(id);

  return (
    <div className="d-flex justify-content-between">
      <label
        className="me-2 text-center"
        htmlFor={id}
      >
        {convertedId[0].toUpperCase() + convertedId.slice(1)}
      </label>

      <input
        id={id}
        type="range"
        step={step}
        min={range[0]}
        max={range[1]}
        defaultValue={defaultValue}
        onChange={({ target }) => (
          callback(Number(target.value))
        )}
      />
    </div>
  );
};
