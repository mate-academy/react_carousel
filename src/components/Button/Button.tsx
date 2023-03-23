import { ButtonHTMLAttributes, PureComponent } from 'react';
import './Button.scss';

type Attributes = Omit<
ButtonHTMLAttributes<HTMLButtonElement>,
'className' | 'type'
>;

interface Props extends Attributes{
  title: string
}

export class Button extends PureComponent<Props> {
  render() {
    const { title, ...props } = this.props;

    return (
      <button
        {...props}
        className="button"
        type="button"
      >
        {title}
      </button>
    );
  }
}
