export type Action =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_FRAME_SIZE'; payload: number }
  | { type: 'SET_ITEM_WIDTH'; payload: number }
  | { type: 'SET_ANIMATION_DURATION'; payload: number }
  | { type: 'SET_INFINITE'; payload: boolean };
