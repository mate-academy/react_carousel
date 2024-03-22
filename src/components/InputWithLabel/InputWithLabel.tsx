import { InputWithLabelProps } from './types';

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  defaultValue,
  ...inputProps
}) => {
  return (
    <>
      <label htmlFor={inputProps.id}>{label}</label>
      <input defaultValue={defaultValue} {...inputProps} type="number" />
    </>
  );
};
