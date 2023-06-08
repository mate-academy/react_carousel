import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinity: boolean,
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

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinity = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinity: event.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinity={infinity}
        />

        <label
          htmlFor="itemId"
          className="label"
        >
          Item Width:
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            min={130}
            max={260}
            step={10}
            onChange={this.setWidth}
          />
        </label>
        <label
          htmlFor="frameId"
          className="label"
        >
          Frame Size:
          <input
            type="number"
            id="frameId"
            value={frameSize}
            min={1}
            max={images.length}
            step={1}
            onChange={this.setFrameSize}
          />
        </label>
        <label
          htmlFor="stepId"
          className="label"
        >
          Step:
          <input
            type="number"
            id="stepId"
            value={step}
            min={1}
            max={images.length}
            step={1}
            onChange={this.setStep}
          />
        </label>
        <label
          htmlFor="animationId"
          className="label"
        >
          Animation Duration:
          <input
            type="number"
            id="animationId"
            value={animationDuration}
            min={500}
            max={5000}
            step={500}
            onChange={this.setAnimationDuration}
          />
        </label>
        <label
          htmlFor="infinityId"
          className="label"
        >
          Infinite:
          <input
            type="checkbox"
            id="infinityId"
            onChange={this.setInfinity}
          />
        </label>
      </div>
    );
  }
}

export default App;
