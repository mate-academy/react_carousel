import React from 'react';
import Controls from './components/Controls';
import MethodHandleFlip from './components/MethodHandleFlip';
import MethodHandleChange from './components/MethodHandleChange';
import './App.css';

import Carousel from './components/Carousel';

const imageData = [
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
];

class App extends React.Component {
  state = {
    images: imageData,
    step: 3,
    currIndex: 0,
    frameSize: 3,
    itemWidth: 130,
    infinite: false,
    animationDuration: 1000,
  };

  handleFlip = (event) => {
    const { name } = event.target;

    this.setState((prevState) => {
      const {
        currIndex, images, frameSize, step, infinite,
      } = prevState;

      return MethodHandleFlip(
        name, currIndex, images, frameSize, step, infinite
      );
    });
  }

  handleChange = (event) => {
    const { name, value, checked } = event.target;

    this.setState((prevState) => {
      const {
        frameSize, images, step, itemWidth, animationDuration,
      } = prevState;

      return MethodHandleChange(
        name, value, checked, frameSize,
        images, step, itemWidth, animationDuration
      );
    });
  }

  render() {
    const {
      images, frameSize, currIndex, step, itemWidth,
      infinite, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          handleFlip={this.handleFlip}
          currIndex={currIndex}
          frameSize={frameSize}
          step={step}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <Controls
          handleChange={this.handleChange}
          infinite={infinite}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          itemWidth={itemWidth}
        />
      </div>
    );
  }
}

export default App;
