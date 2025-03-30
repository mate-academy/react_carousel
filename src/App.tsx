import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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

  setItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      itemWidth: +e.target.value,
    }));
  };

  setFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      frameSize: +e.target.value,
    }));
  };

  setStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      step: +e.target.value,
    }));
  };

  setAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      animationDuration: +e.target.value,
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">
          Item Width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={this.setItemWidth}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={this.setFrameSize}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={this.setStep}
          />
        </label>

        <label htmlFor="animationDuration">
          Animation Duration:
          <input
            id="animationDuration"
            type="number"
            value={animationDuration}
            onChange={this.setAnimationDuration}
          />
        </label>

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
