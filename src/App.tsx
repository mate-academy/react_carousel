import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

  handleStepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ step: value });
  };

  handleFrameSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ frameSize: value });
  };

  handleItemWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ itemWidth: value });
  };

  handleAnimationDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ animationDuration: value });
  };

  handleInfiniteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Boolean(event.target.value);

    this.setState({ infinite: value });
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
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form" action="">
          <label htmlFor="stepId">
            Step:
          </label>
          <input
            type="number"
            name="stepId"
            id="stepId"
            value={step}
            onChange={this.handleStepChange}
          />
          <label htmlFor="frameId">
            Frame Size:
          </label>
          <input
            type="number"
            name="frameId"
            id="frameId"
            value={frameSize}
            onChange={this.handleFrameSizeChange}
          />
          <label htmlFor="itemId">
            Item Width:
          </label>
          <input
            type="number"
            name="itemId"
            id="itemId"
            value={itemWidth}
            onChange={this.handleItemWidthChange}
          />
          <label htmlFor="animationDuration">
            Animation Duration:
          </label>
          <input
            type="number"
            name="animationDuration"
            id="animationDuration"
            value={animationDuration}
            onChange={this.handleAnimationDurationChange}
          />
          <label htmlFor="infinite">
            Infinite:
          </label>
          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            onChange={this.handleInfiniteChange}
          />
        </form>
      </div>
    );
  }
}

export default App;
