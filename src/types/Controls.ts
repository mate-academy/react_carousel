import CarouselType from './CarouselType';

export interface NumberInput {
  title: string,
  name: keyof CarouselType,
  type: 'number',
  value: number,
  min?: number,
  max?: number,
  step?: number,
}

export interface Checkbox {
  title: string,
  name: keyof CarouselType,
  type: 'checkbox',
  value: boolean,
}
