import { FC } from 'react';

type Props = {
  type: string,
  step?: string,
  min?: string,
  max?: string,
  dataName: string,
  changeState: (name: string | undefined, value: number, a: boolean) => void,
};

export const Input: FC<Props> = ({
  changeState,
  type,
  step,
  min,
  max,
  dataName,
  children,
}) => (
  <label>
    {`${children}: `}
    <input
      type={type}
      step={step}
      max={max}
      min={min}
      data-name={dataName}
      onChange={({ target }) => {
        const { dataset, valueAsNumber, checked } = target;

        changeState(dataset.name, valueAsNumber, checked);
      }}
    />
  </label>
);

Input.defaultProps = {
  step: '',
  min: '',
  max: '',
};
