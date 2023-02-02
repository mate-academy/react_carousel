import { HandleEvent } from './HandleEvent';

export type FormHandlers = {
  handleChangeStep: HandleEvent,
  handleChangeItemWidth: HandleEvent,
  handleChangeFrameSize: HandleEvent,
  handleChangeAnimationDuration: HandleEvent,
  handleChangeInfinite: () => void,
};
