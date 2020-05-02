import React from 'react';
import Controls from './components/Controls';
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
    animationDuration: 2000,
  };

  handleFlip = (event) => {
    const { name } = event.target;

    this.setState((prevState) => {
      const {
        currIndex, images, frameSize, step, infinite,
      } = prevState;

      if (name === 'next' && currIndex < images.length - frameSize) {
        return ({ currIndex: currIndex + step });
      }

      if (name === 'back' && currIndex > 0) {
        return ({ currIndex: currIndex - step });
      }

      if ((currIndex >= (images.length - frameSize)) && infinite) {
        return ({ currIndex: 0 });
      }

      if ((currIndex <= 0) && infinite) {
        return ({ currIndex: images.length - frameSize });
      }

      return undefined;
    });
  }

  handleChange = (event) => {
    const { name, value, checked } = event.target;

    this.setState((prevState) => {
      const {
        frameSize, images, step, itemWidth, animationDuration,
      } = prevState;

      if (name === 'plusElement' && frameSize < images.length) {
        return ({ frameSize: frameSize + 1, currIndex: 0 });
      }

      if (name === 'minusElement' && frameSize > 1) {
        return ({ frameSize: frameSize - 1, currIndex: 0 });
      }

      if (name === 'plusStep' && step < images.length) {
        return ({ step: step + 1 });
      }

      if (name === 'minusStep' && step > 1) {
        return ({ step: step - 1 });
      }

      if (name === 'itemWidth') {
        return ({ itemWidth: +value.replace(/\D/g, '') });
      }

      if (name === 'plusTenWidth') {
        return ({ itemWidth: itemWidth + 10 });
      }

      if (name === 'minusTenWidth') {
        return ({ itemWidth: itemWidth - 10 });
      }

      if (name === 'infinite') {
        return ({ [name]: checked });
      }

      if (name === 'animationDuration') {
        return ({ [name]: +value.replace(/\D/g, '') });
      }

      if (name === 'plusTenAnimate') {
        return ({ animationDuration: animationDuration + 100 });
      }

      if (name === 'minusTenAnimate') {
        return ({ animationDuration: animationDuration - 100 });
      }

      return undefined;
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
