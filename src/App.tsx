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

  handleWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.currentTarget.value });
  };

  handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.currentTarget.value });
  };

  handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.currentTarget.value });
  };

  handleAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.currentTarget.value });
  };

  handleInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.currentTarget.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="App__form">
          <label htmlFor="itemId">
            Slide width:
            <input
              type="number"
              id="itemId"
              value={itemWidth}
              onChange={this.handleWidth}
            />
          </label>

          <label htmlFor="frameId">
            Frame size:
            <input
              type="number"
              id="frameId"
              value={frameSize}
              onChange={this.handleFrameSize}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              type="number"
              id="stepId"
              value={step}
              onChange={this.handleStep}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation Duration:
            <input
              type="number"
              id="animationDuration"
              value={animationDuration}
              onChange={this.handleAnimationDuration}
            />
          </label>

          <label>
            Infinite:
            <input
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfinite}
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          // infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
