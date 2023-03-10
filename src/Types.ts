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

export type FormType = Omit<State, 'infinite' | 'images'> & {
  changeState: ChangeStateType,
  imagesLength: number,
}

export type InputType = {
  type: string,
  dataName: string,
  changeState: ChangeStateType,
  step?: string,
  min?: string,
  max?: string,
  value?: string,
}
