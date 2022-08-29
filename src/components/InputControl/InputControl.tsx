import { ChangeEvent, Component } from 'react';

import { NumberInput } from '../../types/Controls';

type Props = NumberInput & {
  handleControlChange: (name: string, value: number) => void,
};

type State = NumberInput;

export class InputControl extends Component<Props, State> {
  state: Readonly<State> = {
    title: this.props.title,
    name: this.props.name,
    type: this.props.type,
    value: this.props.value,
    min: this.props.min || 0,
    max: this.props.max || Infinity,
    step: this.props.step || 1,
  };

  handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;
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
      min,
      max,
      step,
    } = this.state;

    return (
      <div className="InputControl">
        <label
          htmlFor={name}
          className="InputControl__label"
        >
          {title}
        </label>
        <input
          type={type}
          name={name}
          className="InputControl__input"
          id={name}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={this.handleValueChange}
        />
      </div>
    );
  }
}
