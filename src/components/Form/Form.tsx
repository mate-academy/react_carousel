import { FC } from 'react';

import './Form.scss';

export const Form: FC = ({ children }) => (
  <form className="Form">{children}</form>
);
