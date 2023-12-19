import React, { Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinity: boolean;
}

class App extends Component<{}, State> {
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
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinity: false,
  };

  setWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinity = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinity: event.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          step={step}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinity={infinity}
        />
        <label
          htmlFor="itemId"
          className="App__label"
        >
          Item Width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            min={130}
            max={260}
            step={10}
            onChange={this.setWidth}
          />
        </label>

        <label
          htmlFor="frameId"
          className="App__label"
        >
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            min={1}
            max={images.length}
            step={1}
            onChange={this.setFrameSize}
          />
        </label>

        <label
          htmlFor="stepId"
          className="App__label"
        >
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            min={1}
            max={images.length}
            step={1}
            onChange={this.setStep}
          />
        </label>

        <label
          htmlFor="animation"
          className="App__label"
        >
          Animation:
          <input
            id="animation"
            type="number"
            value={animationDuration}
            min={500}
            max={5000}
            step={500}
            onChange={this.setAnimation}
          />
        </label>

        <label
          htmlFor="infinity"
          className="App__label"
        >
          Infinity:
          <input
            id="infinity"
            type="checkbox"
            onChange={this.setInfinity}
          />
        </label>
      </div>
    );
  }
}

export default App;
