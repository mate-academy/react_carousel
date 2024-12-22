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
  };

  handleItemWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value > 0 && value <= 500) {
      this.setState({ itemWidth: value });
    }
  };

  handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const { images } = this.state;

    if (value > 0 && value <= images.length) {
      this.setState({ frameSize: value });
    }
  };

  handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const { images } = this.state;

    if (value > 0 && value <= images.length) {
      this.setState({ step: value });
    }
  };

  handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value > 1 && value <= 10000) {
      this.setState({ animationDuration: value });
    }
  };

  handleInfiniteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs">
          <label htmlFor="itemId">
            Item width:
            <input
              type="number"
              id="itemId"
              value={itemWidth}
              onChange={this.handleItemWidthChange}
              min={1}
              max={500}
            />
          </label>
          <label htmlFor="frameId">
            Frame size:
            <input
              type="number"
              id="frameId"
              value={frameSize}
              onChange={this.handleFrameSizeChange}
              min={1}
              max={images.length}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              type="number"
              id="stepId"
              value={step}
              min={1}
              max={images.length}
              onChange={this.handleStepChange}
            />
          </label>
          <label htmlFor="duration">
            Animation duration (ms):
            <input
              type="number"
              id="duration"
              value={animationDuration}
              min={1}
              max={10000}
              onChange={this.handleAnimationDurationChange}
            />
          </label>
          <label htmlFor="infinity">
            Turn on infinite Carousel:
            <input
              type="checkbox"
              id="infinity"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
