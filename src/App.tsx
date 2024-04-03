import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './types/State';

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
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState(state => {
        return { ...state, itemWidth: +event.target.value };
      });
    };

    const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState(state => {
        return { ...state, frameSize: +event.target.value };
      });
    };

    const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState(state => {
        return { ...state, step: +event.target.value };
      });
    };

    const handleAnimationDuration = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      this.setState(state => {
        return { ...state, animationDuration: +event.target.value };
      });
    };

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__form">
          <label htmlFor="itemId">Item width:</label>
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            min={50}
            max={1000}
            onChange={handleItemWidth}
          />

          <br />
          <label htmlFor="frameId">Frame size:</label>
          <input
            type="number"
            id="frameId"
            value={frameSize}
            min={1}
            max={images.length}
            onChange={handleFrameSize}
          />

          <br />
          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            id="stepId"
            value={step}
            min={1}
            max={images.length}
            onChange={handleStep}
          />

          <br />
          <label htmlFor="animationId">Animation duration:</label>
          <input
            type="number"
            id="animationId"
            value={animationDuration}
            min={0}
            max={3000}
            onChange={handleAnimationDuration}
          />
        </div>

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
