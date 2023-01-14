import { HandleCLick } from './HandleCLick';

export type Button = {
  dataCy: string,
  content: string,
  className: string,
  onClick: HandleCLick,
};
