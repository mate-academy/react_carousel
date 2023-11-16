export interface State {
  step: number;
  margin: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export enum InputId {
  itemId = 'itemWidth',
  marginId = 'margin',
  frameId = 'frameSize',
  stepId = 'step',
  animationDurationId = 'animationDuration',
  infiniteId = 'infinite',
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>
& { target: { id: keyof typeof InputId } };

export type CarouselProps = {
  images: string[],
  step: number,
  margin: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};
