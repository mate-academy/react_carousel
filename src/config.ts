import { NumberInput, Checkbox } from './types/Controls';

type Controls = (NumberInput | Checkbox);

export const controlsData: Controls[] = [
  {
    title: 'Item width',
    name: 'itemWidth',
    type: 'number',
    value: 130,
    min: 10,
    step: 1,
  },
  {
    title: 'Frame size',
    name: 'frameSize',
    type: 'number',
    value: 3,
    min: 1,
    step: 1,
  },
  {
    title: 'Step',
    name: 'step',
    type: 'number',
    value: 3,
    min: 1,
    step: 1,
  },
  {
    title: 'Animation duration',
    name: 'animationDuration',
    type: 'number',
    value: 1000,
    min: 0,
    max: 5000,
    step: 100,
  },
  {
    title: 'Infinite',
    name: 'infinite',
    type: 'checkbox',
    value: false,
  },
];

export const imagesData: string[] = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];
