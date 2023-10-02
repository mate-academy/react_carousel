type Default = {
  WIDTH: number,
  FRAME_SIZE: number,
  STEP: number,
  ANIMATION: number,
  INFINITY: boolean,
};

export const DEFAULT: Default = {
  WIDTH: 130,
  FRAME_SIZE: 3,
  STEP: 3,
  ANIMATION: 1000,
  INFINITY: false,
};

export const info = {
  minWidth: 130,
  maxWidth: 400,
  widthStep: 1,
  minFrameSize: 1,
  maxFrameSize: 10,
  minStep: 1,
  maxStep: 5,
  animationDurationStep: 50,
  minAnimationDuration: 50,
  maxAnimationDuration: 2000,
};
