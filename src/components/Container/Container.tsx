import { FC } from 'react';

import './Container.scss';

export const Container: FC = ({ children }) => (
  <div className="Container">{children}</div>
);
