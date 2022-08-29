export interface NumberInput {
  title: string,
  name: string,
  type: 'number',
  value: number,
  min?: number,
  max?: number,
  step?: number,
}

export interface Checkbox {
  title: string,
  name: string,
  type: 'checkbox',
  value: boolean,
}
