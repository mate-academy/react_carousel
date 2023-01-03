export interface InputSet {
  images: string[]
  step: number
  frameSize: number
  itemWidth: number
  animationDuration: number
  infinite: boolean
  distance: number
}

export type Hook<T> = React.Dispatch<React.SetStateAction<T>>;

export interface InputHooks {
  setStep: Hook<number>,
  setItemWidth: Hook<number>,
  setFrameSize: Hook<number>,
  setAnimationDuration: Hook<number>,
  setInfinite: Hook<boolean>,
  setDistance: Hook<number>,
}
