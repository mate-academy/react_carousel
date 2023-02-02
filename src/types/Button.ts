import { HandleCLick } from './HandleCLick';

export type Button = {
  dataCy: string,
  content: string,
  disabled: boolean,
  className: string,
  onClick: HandleCLick,
};
