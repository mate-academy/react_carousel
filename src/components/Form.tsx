import React, { ChangeEvent } from 'react';
import './Form.scss';

type State = {
  value: string;
  isError: boolean;
};

type Props = {
  changeNumber(number: string): void,
  range:(number: number) => boolean,
  placeholder: string,
  text: string,
};

class Form extends React.Component<Props, State> {
  state = {
    value: '',
    isError: false,
  };

  render() {
    const {
      changeNumber,
      range,
      placeholder,
      text,
    } = this.props;
    const {
      value,
      isError,
    } = this.state;

    const submitHandler = (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (range(+value)) {
        changeNumber(value);
        this.setState({ value: '' });
      } else {
        this.setState({ isError: true });
      }
    };

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState(
        {
          value: event.target.value,
          isError: false,
        },
      );
    };

    return (
      <form
        className="Form"
        onSubmit={submitHandler}
      >

        <input
          className="Form__input"
          type="number"
          placeholder={placeholder}
          value={value.trim()}
          onChange={changeHandler}
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
