import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10),
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <div className="controls">
          <label>
            Item Width (px):
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Step:
            <input
              type="number"
              name="step"
              value={step}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Animation Duration (ms):
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleInputChange}
            />
          </label>
        </div>

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
