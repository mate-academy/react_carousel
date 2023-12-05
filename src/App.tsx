import React, { ChangeEvent } from 'react';
import './App.scss';
import { State } from './types';
import { Carousel } from './components/Carousel';

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

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'infinite') {
      this.setState((previousData) => ({ infinite: !previousData.infinite }));

      return;
    }

    this.setState((previousData) => ({ ...previousData, [name]: +value }));
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
        <h1 data-cy="title" className="App__title">8-bit Carousel with {images.length} images</h1>
        <div className="App__wrapper">
          <label className="App__label" htmlFor="itemId">
            Item width:
            <input
              className="App__input"
              type="number"
              id="itemId"
              name="itemWidth"
              min="50"
              max="200"
              step="5"
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="frameId">
            Frame size:
            <input
              className="App__input"
              type="number"
              id="frameId"
              name="frameSize"
              min="1"
              max="9"
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="stepId">
            Step:
            <input
              className="App__input"
              type="number"
              id="stepId"
              name="step"
              min="1"
              max={images.length}
              value={step}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="animationDuration">
            Animation duration (ms):
            <input
              className="App__input"
              type="number"
              id="animationDuration"
              name="animationDuration"
              min="50"
              step="50"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="infinite">
            Infinite:
            <input
              className="App__checkbox"
              type="checkbox"
              id="infinite"
              name="infinite"
              onChange={this.handleInputChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
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
