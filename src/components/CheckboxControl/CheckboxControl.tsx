import { ChangeEvent, Component } from 'react';

import { Checkbox } from '../../types/Controls';

import './CheckboxControl.scss';

type Props = Checkbox & {
  handleControlChange: (name: string, value: boolean) => void,
};

type State = Checkbox;

export class CheckboxControl extends Component<Props, State> {
  state: Readonly<State> = {
    title: this.props.title,
    name: this.props.name,
    type: this.props.type,
    value: this.props.value,
  };

  handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    const name = event.target.getAttribute('name') || '';

    this.setState({
      value: newValue,
    });

    this.props.handleControlChange(name, newValue);
  };

  render() {
    const {
      title,
      name,
      type,
      value,
    } = this.state;

    return (
      <div className="CheckboxControl">
        <label
          htmlFor={name}
          className="CheckboxControl__label"
        >
          {title}
        </label>
        <input
          type={type}
          name={name}
          className="CheckboxControl__input"
          id={name}
          checked={value}
          onChange={this.handleValueChange}
        />
      </div>
    );
  }
}
