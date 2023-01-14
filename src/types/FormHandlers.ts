import { HandleEvent } from './HandleEvent';

export type FormHandlers = {
  onChangeStep: HandleEvent,
  onChangeItemWidth: HandleEvent,
  onChangeFrameSize: HandleEvent,
  onChangeAnimationDuration: HandleEvent,
  onChangeInfinite: () => void,
};
