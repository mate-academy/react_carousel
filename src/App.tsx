import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={this.state.frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div>
          <label htmlFor="itemId">
            Item Width:
          </label>
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            min={130}
            max={260}
            step={10}
            onChange={this.setItemWidth}
          />
        </div>

        <div>
          <label htmlFor="frameId">
            Frame Size:
          </label>
          <input
            type="number"
            value={frameSize}
            id="frameId"
            min={1}
            max={images.length}
            step={1}
            onChange={this.setFrameSize}
          />
        </div>

        <div>
          <label htmlFor="stepId">
            Step:
          </label>
          <input
            type="number"
            id="stepId"
            value={step}
            min={1}
            max={images.length}
            step={1}
            onChange={this.setStep}
          />
        </div>

        <div>
          <label htmlFor="animationId">
            Animation Duration:
          </label>
          <input
            type="number"
            id="animationId"
            value={animationDuration}
            min={500}
            max={5000}
            step={500}
            onChange={this.setAnimationDuration}
          />
        </div>

        <div>
          <label htmlFor="infiniteId">
            Infinite:
          </label>
          <input
            type="checkbox"
            id="infiniteId"
            onChange={this.setInfinite}
          />
        </div>
      </div>
    );
  }
}

export default App;
