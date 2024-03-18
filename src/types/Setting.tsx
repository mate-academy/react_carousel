import { ChangeEvent } from 'react';

export interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

export interface InputProps extends CarouselProps {
  setChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
