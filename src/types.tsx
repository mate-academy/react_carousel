export interface AppState {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export interface CarouselProps {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export interface CarouselState {
  images: string[],
  position: number,
}

export interface FormProps {
  images: string[],
  handleStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
