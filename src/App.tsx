import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
// import { set } from 'cypress/types/lodash';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const images = [
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

class App extends React.Component<{}, State> {
  state: State = {
    images: images,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  render() {
    const { step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__container">
          <label className="App__label" htmlFor="itemId">
            Item width
            <input
              className="App__input"
              type="number"
              id="itemId"
              min={0}
              step={10}
              value={itemWidth}
              onChange={this.handleItemWidthChange}
            />
          </label>
          <label className="App__label" htmlFor="frameId">
            Frame Size
            <input
              className="App__input"
              type="number"
              id="frameId"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={this.handleFrameSizeChange}
            />
          </label>
          <label className="App__label" htmlFor="stepId">
            Step
            <input
              className="App__input"
              type="number"
              id="stepId"
              min={1}
              value={step}
              onChange={this.handleStepChange}
            />
          </label>
          <label className="App__label" htmlFor="animationDuration">
            Animation Duration
            <input
              className="App__input"
              type="number"
              id="animationDuration"
              step={100}
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
            />
          </label>
          <label className="App__label" htmlFor="infinite">
            Infinite
            <input
              className="App__input"
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ infinite: event.target.checked })
              }
            />
          </label>
        </div>

        <Carousel
          images={this.state.images}
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
