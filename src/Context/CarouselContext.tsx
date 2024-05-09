import { createContext } from 'react';

type CarouselContextType = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  setItemWidth: (itemWidth: number) => void;
  setFrameSize: (frameSize: number) => void;
  setStep: (step: number) => void;
  setAnimationDuration: (animationDuration: number) => void;
  setInfinite: (infinite: boolean) => void;
};

export const CarouselContext = createContext<CarouselContextType>({
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
  setItemWidth: () => {},
  setFrameSize: () => {},
  setStep: () => {},
  setAnimationDuration: () => {},
  setInfinite: () => {},
});
