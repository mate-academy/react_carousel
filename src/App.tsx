import React from 'react';

import { Carousel } from './components/Carousel/Carousel';

import './App.scss';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

export class App extends React.Component<{}, State> {
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title"> Carousel with {images.length} images</h1>

        <label htmlFor="itemId">Item width:</label>

        <input
          id="itemId"
          type="number"
          value={itemWidth}
          min="1"
          onChange={event => {
            this.setState({
              itemWidth: Number(event.target.value),
            });
          }}
        />

        <label htmlFor="frameId">Frame size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          min="1"
          max={images.length}
          onChange={event => {
            this.setState({
              frameSize: Number(event.target.value),
            });
          }}
        />

        <label htmlFor="stepId">Step:</label>

        <input
          id="stepId"
          type="number"
          value={step}
          min="1"
          onChange={event => {
            this.setState({
              step: Number(event.target.value),
            });
          }}
        />

        <label htmlFor="animationId">Animation duration:</label>

        <input
          id="animationId"
          type="number"
          value={animationDuration}
          min="0"
          onChange={event => {
            this.setState({
              animationDuration: Number(event.target.value),
            });
          }}
        />

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
