import React from 'react';
import './App.scss';

import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setStep = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setFrameSize = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setItemWidth = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setAnimationDuration = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinite = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
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
        <h1
          data-cy="title"
          className="App__title"
        >
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <form className="App__form">
          <label htmlFor="step" className="App__label">
            <h3 className="App__title">Step:</h3>
            <input
              type="number"
              className="App__input"
              defaultValue={step}
              onChange={this.setStep}
              min="1"
              max={images.length}
            />
          </label>

          <label
            htmlFor="frameSize"
            className="App__label"
          >
            <h3 className="App__title">Frame Size:</h3>
            <input
              type="number"
              className="App__input"
              defaultValue={frameSize}
              min="1"
              max={images.length}
              onChange={this.setFrameSize}
            />
          </label>

          <label
            htmlFor="itemWidth"
            className="App__label"
          >
            <h3 className="App__title">Item Width:</h3>
            <input
              type="number"
              className="App__input App__input--itemWidth"
              defaultValue={itemWidth}
              min="50"
              max="250"
              onChange={this.setItemWidth}

            />
          </label>

          <label
            htmlFor="animationDuration"
            className="App__label"
          >
            <h3 className="App__title">Animation Duration:</h3>
            <input
              type="number"
              className="App__input App__input--animDurat"
              defaultValue={animationDuration}
              min="0"
              onChange={this.setAnimationDuration}

            />
          </label>

          <label
            htmlFor="infinite"
            className="App__label"
          >
            <h3 className="App__title">Infinite:</h3>
            <input
              type="checkbox"
              className="App__input App__input--infinite"
              onChange={this.setInfinite}
            />
          </label>
        </form>

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
