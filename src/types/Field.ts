import { HandleEvent } from './HandleEvent';

export type Field = {
  min?: string,
  max?: string,
  name: string,
  type: string,
  value?: string,
  checked?: boolean,
  className: string,
  onChange: HandleEvent,
};
