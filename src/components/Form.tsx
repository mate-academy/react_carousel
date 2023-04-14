import React, { ChangeEvent } from 'react';
import './Form.scss';

type State = {
  value: string;
  isError: boolean;
};

type Props = {
  changeNumber(number: string): void,
  range:(number: number) => boolean,
  text: string,
  value: string;
};

class Form extends React.Component<Props, State> {
  state = {
    value: this.props.value,
    isError: false,
  };

  render() {
    const {
      changeNumber,
      range,
      text,
    } = this.props;
    const {
      value,
      isError,
    } = this.state;

    const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (range(+value)) {
        changeNumber(value);
      } else {
        this.setState({ isError: true });
      }
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      const a = event.target.value;

      this.setState(
        {
          value: a.replace(/\D/g, ''),
          isError: false,
        },
      );
    };

    return (
      <form
        className="Form"
        onSubmit={handleSubmit}
      >

        <input
          className="Form__input"
          type="text"
          value={value}
          onInput={handleInput}
        />
        <button
          className="Form__button"
          type="submit"
          disabled={!value}
        >
          {text}
        </button>
        {isError && (
          <p className="Form__error">
            Out of range!
          </p>
        )}
      </form>
    );
  }
}

export default Form;
