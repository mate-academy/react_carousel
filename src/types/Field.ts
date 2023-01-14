import { HandleEvent } from './HandleEvent';

export type Field = {
  name: string,
  type: string,
  value?: string,
  checked?: boolean,
  className: string,
  onChange: HandleEvent,
};
