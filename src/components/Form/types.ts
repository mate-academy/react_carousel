import { InputWithLabelProps } from '../InputWithLabel/types';

export interface FormProps {
  onChange: (key: string, value: number) => void;
  inputs: InputWithLabelProps[];
}
