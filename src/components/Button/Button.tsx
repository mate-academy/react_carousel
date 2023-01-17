import { PureComponent } from 'react';
import { Button as ButtonProps } from '../../types/Button';

import './Button.scss';

export class Button extends PureComponent<ButtonProps, {}> {
  render() {
    const {
      dataCy,
      content,
      disabled,
      className,
      onClick,
    } = this.props;

    const btnClassName = `Button Button--${dataCy} ${className} ${className}--${dataCy}
    `;

    return (
      <button
        type="button"
        data-cy={dataCy}
        className={btnClassName}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
    );
  }
}
