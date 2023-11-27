export interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export interface SettingFormState extends State {
  setStep: (newStep: number) => void,
  setFrameSize: (newFrameSize: number) => void,
  setItemWidth: (newItemWidth: number) => void,
  setAnimationDuration: (newAnimationDuration: number) => void,
  setInfinite: (newInfinite: boolean) => void,
}
