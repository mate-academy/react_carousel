import React, { ChangeEvent } from 'react';

import { State } from './types/State';
import Carousel from './components/Carousel';
import './App.scss';

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

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    const setItemWidth = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ itemWidth: +e.target.value });

    const setFrameSize = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ frameSize: +e.target.value });

    const setStep = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ step: +e.target.value });

    const setAnimationDuration = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ animationDuration: +e.target.value });

    const setInfinite = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ infinite: e.target.checked });

    return (
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <div className="app__form">
          <label htmlFor="itemId" className="app__label">
            Item width:
            <input
              type="number"
              id="itemId"
              onChange={setItemWidth}
              value={itemWidth}
              className="app__input"
            />
          </label>
          <label htmlFor="frameId" className="app__label">
            Frame size:
            <input
              type="number"
              id="frameId"
              onChange={setFrameSize}
              value={frameSize}
              className="app__input"
            />
          </label>
          <label htmlFor="stepId" className="app__label">
            Step:
            <input
              type="number"
              id="stepId"
              onChange={setStep}
              value={step}
              className="app__input"
            />
          </label>
          <label htmlFor="animationId" className="app__label">
            Animation duration:
            <input
              type="number"
              id="animationId"
              onChange={setAnimationDuration}
              value={animationDuration}
              className="app__input"
            />
          </label>
          <label htmlFor="infiniteId" className="app__label">
            Infinite:
            <input
              type="checkbox"
              id="infiniteId"
              onChange={setInfinite}
              checked={infinite}
              className="app__input"
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
