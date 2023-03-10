export interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export type ChangeStateType = (
  name: string | undefined,
  value: number,
  bool: boolean
) => void;

export type StateCarousel = {
  moveImage: number,
};
