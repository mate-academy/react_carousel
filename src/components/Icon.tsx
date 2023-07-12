import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Icon: FC<Props> = ({ children }) => (
  <span className="material-symbols-outlined">
    {children}
  </span>
);
