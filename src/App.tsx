import React from 'react';
import './App.scss';

import {
  Carousel,
  DEFAULT_PROPS as CAROUSEL_DEFAULT_PROPS,
} from './components/Carousel';

import { clamp } from './utils/clamp';

interface State {
  images: string[];

  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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

    itemWidth: CAROUSEL_DEFAULT_PROPS.ITEM_WIDTH,
    frameSize: CAROUSEL_DEFAULT_PROPS.FRAME_SIZE,
    step: CAROUSEL_DEFAULT_PROPS.STEP,
    animationDuration: CAROUSEL_DEFAULT_PROPS.ANIMATION_DURATION,
    isInfinite: CAROUSEL_DEFAULT_PROPS.INFINITE,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ itemWidth: clamp(value, 0, 1000) });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ frameSize: clamp(value, 0, 10) });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    this.setState({ step: clamp(value, 0, 10) });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value);

    this.setState({ animationDuration: clamp(value, 0, 10000) });
  };

  handleInfiniteLoopToggle = () => {
    this.setState({ isInfinite: !this.state.isInfinite });
  };

  render() {
    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {this.state.images.length} images</h1>

        <>
          <label htmlFor="itemId">Item width: </label>
          <input
            onChange={this.handleItemWidthChange}
            type="number"
            name="itemId"
            id="itemId"
            value={this.state.itemWidth}
          />
          <br />

          <label htmlFor="frameId">Frame size: </label>
          <input
            onChange={this.handleFrameSizeChange}
            type="number"
            name="frameId"
            id="frameId"
            value={this.state.frameSize}
          />
          <br />

          <label htmlFor="stepId">Step: </label>
          <input
            onChange={this.handleStepChange}
            type="number"
            name="stepId"
            id="stepId"
            value={this.state.step}
          />
          <br />

          <label htmlFor="animationDuration">Animation duration: </label>
          <input
            onChange={this.handleAnimationDurationChange}
            type="number"
            name="animationDuration"
            id="animationDuration"
            value={this.state.animationDuration}
          />
          <br />

          <label htmlFor="infinite">Infinite loop: </label>
          <input
            onClick={this.handleInfiniteLoopToggle}
            type="checkbox"
            name="infinite"
            id="infinite"
            checked={this.state.isInfinite}
          />
          <br />
        </>

        <Carousel
          images={this.state.images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          animationDuration={this.state.animationDuration}
          step={this.state.step}
          infinite={this.state.isInfinite}
        />
      </div>
    );
  }
}

export default App;
