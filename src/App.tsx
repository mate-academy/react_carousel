import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    this.setState({ itemWidth: value || 130 });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    this.setState({ frameSize: value || 3 });
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    this.setState({ step: value || 3 });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    this.setState({ animationDuration: value || 1000 });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="menu">
          <label
            htmlFor="itemId"
            className="label"
          >
            Item Width:
            <input
              value={itemWidth}
              type="number"
              id="itemId"
              min={60}
              max={260}
              step={10}
              onChange={this.setItemWidth}
            />
          </label>
          <label
            htmlFor="frameId"
            className="label"
          >
            Frame Size:
            <input
              value={frameSize}
              type="number"
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
              value={step}
              type="number"
              id="stepId"
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
            AnimationDuration:
            <input
              value={animationDuration}
              type="number"
              id="animationId"
              min={500}
              max={5000}
              step={500}
              onChange={this.setAnimationDuration}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
