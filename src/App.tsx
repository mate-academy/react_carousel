import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { States } from './components/types/States';

export class App extends React.Component<{}, States> {
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

  adjustItemWidth = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(allStates => ({
      ...allStates,
      itemWidth: +e.target.value,
    }));
  };

  adjustFrameSize = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(allStates => ({
      ...allStates,
      frameSize: +e.target.value,
    }));
  };

  adjustStep = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(allStates => ({
      ...allStates,
      step: +e.target.value,
    }));
  };

  adjustAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(allStates => ({
      ...allStates,
      animationDuration: +e.target.value,
    }));
  };

  adjustInfinite = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <>
        <div className="App">
          {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        </div>
        <label htmlFor="itemId" className="App__label">
          {'       '}Item width:{' '}
        </label>
        <input
          type="number"
          name="itemWidthInput"
          id="itemId"
          min="130"
          max="300"
          step="10"
          className="App__input"
          value={itemWidth}
          onChange={this.adjustItemWidth}
        />

        <label htmlFor="frameId" className="App__label">
          {'       '}Frame Size:{' '}
        </label>
        <input
          type="number"
          name="frameSizeInput"
          id="frameId"
          min="3"
          max="10"
          value={frameSize}
          className="App__input"
          onChange={this.adjustFrameSize}
        />

        <label htmlFor="stepId" className="App__label">
          {'       '}Step:{' '}
        </label>
        <input
          type="number"
          name="stepInput"
          id="stepId"
          min="1"
          max="10"
          value={step}
          className="App__input"
          onChange={this.adjustStep}
        />

        <label htmlFor="animationDurationId" className="App__label">
          {'       '}Animation Duration:{' '}
        </label>
        <input
          type="number"
          name="animationDurationInput"
          id="animationDurationId"
          min="1000"
          max="10000"
          value={animationDuration}
          className="App__input"
          onChange={this.adjustAnimationDuration}
        />

        <label htmlFor="infiniteId" className="App__label">
          {'       '}Infinite:{' '}
        </label>
        <input
          type="checkbox"
          name="infiniteCheckbox"
          id="infiniteId"
          onChange={this.adjustInfinite}
          className="App__input"
          checked={infinite}
        />
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </>
    );
  }
}

export default App;
