export interface InputValues {
  images: string[]
  step: number
  frameSize: number
  itemWidth: number
  animationDuration: number
  infinite: boolean
  distance: number
}

export interface InputProps {
  type: string
  inputId: string
  value?: number
  min?: number
  step?: number
  max?: number
  checked?: boolean
  handleChange?: Hook<number>
  handleCheck?: Hook<boolean>
  info: string
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
