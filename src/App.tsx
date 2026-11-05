import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step?: number;
  itemWidth?: number;
  frameSize?: number;
  animationDuration?: number;
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

    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } = this.state;

    return (
      <div
        className="App">
        {/* eslint-disable-next-line */}

        <h1
          data-cy="title"
        >Carousel with {images.length} images</h1>
        <div>
          <label htmlFor="itemId">Item width</label>
          <input
            id="itemId"
            data-cy="itemWidth"
            type="number"
            value={itemWidth}
            onChange={(event) => { this.setState({ itemWidth: +event.target.value }); }}
          />
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            data-cy="step"
            type="number"
            value={step}
            onChange={(event) => { this.setState({ step: +event.target.value }); }}
          />
          <label htmlFor="frameId">Size</label>
          <input
            id='frameId'
            data-cy="frameSize"
            type='number'
            value={frameSize}
            onChange={(event) => { this.setState({ frameSize: +event.target.value }); }}
          />
          <label htmlFor="animationId">Animation duration</label>
          <input
            id='animationId'
            data-cy="animationDuration"
            type="number"
            value={animationDuration}
            onChange={(event) => { this.setState({ animationDuration: +event.target.value }); }}
          />
        </div>
        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
