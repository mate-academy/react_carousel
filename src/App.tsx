import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked,
      max,
      min,
    } = event.target;

    this.setState((prevState: State) => {
      let finalValue = value;

      if (+value > +max) {
        finalValue = max;
      }

      if (+value < +min) {
        finalValue = min;
      }

      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : +finalValue,
      };
    });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          action="post"
          className="App__Form"
        >
          <label className="App__Form-input">
            Item Width
            <input
              type="number"
              name="itemWidth"
              min={130}
              max={500}
              value={itemWidth}
              onChange={this.handleChange}
            />
          </label>
          <label className="App__Form-input">
            Frame Size
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={this.handleChange}
            />
          </label>
          <label className="App__Form-input">
            Step
            <input
              type="number"
              name="step"
              value={step}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </label>
          <label className="App__Form-input">
            Animation Duration
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              min={1000}
              onChange={this.handleChange}
            />
          </label>
          <label className="App__Form-input">
            Infinite
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
