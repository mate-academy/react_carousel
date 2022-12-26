import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  itemSize: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
    itemSize: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleOnChangeItemSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { itemSize: +event.currentTarget.value },
    );
  };

  handleOnChangeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { frameSize: +event.currentTarget.value },
    );
  };

  handleOnChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { step: +event.currentTarget.value },
    );
  };

  handleOnChangeAnimationDuration
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { animationDuration: +event.currentTarget.value },
    );
  };

  handleOnChangeInfinite
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { infinite: event.currentTarget.checked },
    );
  };

  render() {
    const {
      images,
      itemSize,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          className="App__title"
          data-cy="title"
        >
          Carousel with
          {` ${images.length} `}
          images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemSize={itemSize}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form action="#" className="App__form">
          <label htmlFor="itemId">
            {'Item Width '}
            <input
              id="itemId"
              type="number"
              defaultValue={itemSize}
              onChange={this.handleOnChangeItemSize}
              className="App__input"
            />
          </label>

          <label htmlFor="frameId">
            {'Frame Size '}
            <input
              id="frameId"
              type="number"
              defaultValue={frameSize}
              onChange={this.handleOnChangeFrameSize}
              min="1"
              max={`${images.length}`}
              className="App__input"
            />
          </label>

          <label htmlFor="stepId">
            {'Step '}
            <input
              id="stepId"
              type="number"
              defaultValue={step}
              onChange={this.handleOnChangeStep}
              min="1"
              max={`${images.length}`}
              className="App__input"
            />
          </label>

          <label>
            {'Animation Duration '}
            <input
              type="number"
              defaultValue={animationDuration}
              onChange={this.handleOnChangeAnimationDuration}
              min="1000"
              max="10000"
              className="App__input"
            />
          </label>

          <label className="App__checkbox-label">
            {'Infinite '}
            <input
              type="checkbox"
              onChange={this.handleOnChangeInfinite}
              className="App__checkbox"
            />
            <span className="App__custom-checkbox" />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
