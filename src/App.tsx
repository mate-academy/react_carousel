import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
}

export class App extends React.Component<{}, State> {
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

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { itemWidth: +event.currentTarget.value },
    );
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { frameSize: +event.currentTarget.value },
    );
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { step: +event.currentTarget.value },
    );
  };

  handleAnimationDurationChange
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { animationDuration: +event.currentTarget.value },
    );
  };

  handleInfiniteChange
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { infinite: event.currentTarget.checked },
    );
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <form className="App__form" action="#">
          <label htmlFor="itemId">
            {'Item Width '}
            <input
              id="itemId"
              name="itemWidth"
              value={itemWidth}
              min="100"
              max="300"
              step="10"
              type="number"
              onChange={this.handleItemWidthChange}
            />
          </label>

          <label htmlFor="frameId">
            {'Frame Size '}
            <input
              id="frameId"
              name="frameSize"
              value={frameSize}
              type="number"
              min="1"
              max={`${images.length}`}
              step="1"
              onChange={this.handleFrameSizeChange}
            />
          </label>

          <label htmlFor="stepId">
            {'Step '}
            <input
              id="stepId"
              name="step"
              value={step}
              type="number"
              min="1"
              max={`${images.length - frameSize}`}
              step="1"
              onChange={this.handleStepChange}
            />
          </label>

          <label htmlFor="animationId">
            {'Animation Duration '}
            <input
              id="animationId"
              name="animationDuration"
              value={animationDuration}
              type="number"
              min="100"
              max="5000"
              step="100"
              onChange={this.handleAnimationDurationChange}
            />
          </label>

          <label htmlFor="infiniteId">
            {'Infinite '}
            <input
              id="infiniteId"
              name="infinite"
              type="checkbox"
              onChange={this.handleInfiniteChange}
            />
          </label>
        </form>
      </div>
    );
  }
}
