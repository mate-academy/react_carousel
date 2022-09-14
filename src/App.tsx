import React, { ChangeEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

function checkValueValid(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

interface State {
  images: string[];
  ItemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    ItemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const min = 70;
    const max = 500;

    const ItemWidth = checkValueValid(
      Number(event.target.value),
      min,
      max,
    );

    this.setState({ ItemWidth });
  };

  handleFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    const min = 1;
    const max = this.state.images.length;

    const frameSize = checkValueValid(
      Number(event.target.value),
      min,
      max,
    );

    this.setState({ frameSize });
  };

  handleAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const min = 100;
    const max = 2000;

    const animationDuration = checkValueValid(
      Number(event.target.value),
      min,
      max,
    );

    this.setState({ animationDuration });
  };

  handleInfinite = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  handleStep = (event: ChangeEvent<HTMLInputElement>) => {
    const min = 1;
    const max = this.state.images.length;
    const step = checkValueValid(Number(event.target.value), min, max);

    this.setState({ step });
  };

  render() {
    const {
      images,
      ItemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
        <div className="inputSettingsContainer">

          <label>
            Item Width:
            <input
              type="number"
              name="itemWidth"
              id="ItemWidth"
              min="70"
              max="500"
              defaultValue={ItemWidth}
              onChange={this.handleItemWidth}
            />
          </label>

          <label>
            Frame Size:
            <input
              type="number"
              name="frameSize"
              id="frameSize"
              min={1}
              max={images.length}
              defaultValue={frameSize}
              onChange={this.handleFrameSize}
            />
          </label>

          <label>
            Step:
            <input
              type="number"
              name="step"
              id="step"
              min={1}
              max={images.length}
              defaultValue={step}
              onChange={this.handleStep}
            />
          </label>

          <label>
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              min={100}
              max={2000}
              defaultValue={animationDuration}
              onChange={this.handleAnimationDuration}
            />
          </label>

          <label>
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={infinite}
              onChange={this.handleInfinite}
            />
          </label>
        </div>
        <Carousel
          images={images}
          ItemWidth={ItemWidth}
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
