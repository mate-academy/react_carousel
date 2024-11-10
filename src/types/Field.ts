export interface Field {
  text: string;
  name: string;
  type: string;
  label?: string;
  value?: string | number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void ;
  min?: number;
  max?: number;
  checked?: boolean;
}
