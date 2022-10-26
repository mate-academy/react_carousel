import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const images = [
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

interface State {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
}

export class App extends React.Component<{}, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="subtitle is-2"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />

        <div className="slidecontainer">
          <label htmlFor="itemId">
            {`Set your image width: (${itemWidth} px)`}
          </label>
          <input
            id="itemId"
            type="range"
            min="130"
            max="200"
            value={itemWidth}
            className="slider"
            onChange={event => {
              this.setState({ itemWidth: Number(event.target.value) });
            }}
          />
        </div>

        <div className="slidecontainer">
          <label htmlFor="frameId">
            {`Set your frame size: (${frameSize} images)`}
          </label>
          <input
            id="frameId"
            type="range"
            min="2"
            max="5"
            value={frameSize}
            className="slider"
            onChange={event => {
              this.setState({ frameSize: Number(event.target.value) });
            }}
          />
        </div>

        <div className="slidecontainer">
          <label htmlFor="stepId">
            {`Set your step to slide: (${step} image${(step !== 1) ? 's' : ''})`}
          </label>
          <input
            id="stepId"
            type="range"
            min="1"
            max="5"
            value={step}
            className="slider"
            onChange={event => {
              this.setState({ step: Number(event.target.value) });
            }}
          />
        </div>

        <div className="slidecontainer">
          <label htmlFor="durationId">
            {`Set your speed to slide: (${animationDuration} ms)`}
          </label>
          <input
            id="durationId"
            type="range"
            min="500"
            max="3000"
            step="500"
            value={animationDuration}
            className="slider"
            onChange={event => {
              this.setState({ animationDuration: Number(event.target.value) });
            }}
          />
        </div>
      </div>
    );
  }
}
