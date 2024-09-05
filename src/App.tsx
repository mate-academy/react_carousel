import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  errorMessage: string;
  previousItemWidth: number;
}

class App extends React.Component<{}, State> {
  state = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
    errorMessage: '',
    previousItemWidth: 130,
  };

  validateFrameSizeOrStep = (name: string, value: number): string => {
    if (value < 1 || value > this.state.images.length - this.state.frameSize) {
      return `${name} must be between 1 and ${this.state.images.length - this.state.frameSize}.`;
    }

    return '';
  };

  validateAnimationDuration = (value: number): string => {
    if (value < 100 || value > 3000) {
      return 'Animation duration must be between 100 and 3000.';
    }

    return '';
  };

  validateItemWidth = (value: number): string => {
    if (value < 50 || value > 300) {
      return 'Item width must be between 50 and 300.';
    }

    return '';
  };

  handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = Number(value);
    let errorMessage = '';

    if (name === 'frameSize' || name === 'step') {
      errorMessage = this.validateFrameSizeOrStep(name, newValue);
    } else if (name === 'animationDuration') {
      errorMessage = this.validateAnimationDuration(newValue);
    }

    if (errorMessage) {
      this.setState({ errorMessage });
    } else {
      this.setState(prevState => ({
        ...prevState,
        [name]: newValue,
        errorMessage: '',
      }));
    }
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = Number(value);
    const errorMessage = this.validateItemWidth(Number(value));

    if (errorMessage) {
      this.setState({ [name]: newValue, errorMessage } as unknown as Pick<
        State,
        keyof State
      >);

      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          [name]: prevState.previousItemWidth,
          // errorMessage: '',
        }));
      }, 100);

      return;
    }

    this.setState(prevState => ({
      ...prevState,
      [name]: newValue,
      previousItemWidth: newValue,
      errorMessage: '',
    }));
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    this.setState({
      [name]: checked,
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
      errorMessage,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <form className="App__form form">
          <label className="form__label" htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              className="form__input"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={50}
              max={300}
              onChange={this.handleItemWidthChange}
            />
          </label>
          <label className="form__label" htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              className="form__input"
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={images.length - frameSize}
              onChange={this.handleNumberInputChange}
            />
          </label>
          <label className="form__label" htmlFor="stepId">
            Step:
            <input
              id="stepId"
              className="form__input"
              type="number"
              name="step"
              value={step}
              min={1}
              max={images.length - frameSize}
              onChange={this.handleNumberInputChange}
            />
          </label>
          <label className="form__label">
            Animation Duration:
            <input
              className="form__input"
              type="number"
              name="animationDuration"
              value={animationDuration}
              min={100}
              max={3000}
              onChange={this.handleNumberInputChange}
            />
          </label>
          <label className="form__label">
            Infinite:
            <input
              className="form__input"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleCheckboxChange}
              aria-hidden="true"
            />
            <span className="form__custom-checkbox"></span>
          </label>
        </form>
        {errorMessage ? (
          <p className="form__message form__message--error">{errorMessage}</p>
        ) : (
          <p className="form__message form__message--empty">-</p>
        )}

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
