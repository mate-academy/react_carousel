export interface State {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export enum InputId {
  itemId = 'itemWidth',
  frameId = 'frameSize',
  stepId = 'step',
  animationDurationId = 'animationDuration',
  infiniteId = 'infinite',
}
