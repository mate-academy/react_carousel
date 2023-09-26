import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setImageWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <h1 data-cy="title">Carousel</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="inputs">
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              className="inputs__input"
              type="number"
              value={step}
              min={1}
              max={5}
              step={1}
              onChange={this.setStep}
            />
          </label>

          <label htmlFor="frameId">
            Frame size:
            <input
              id="frameId"
              className="inputs__input"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              step={1}
              onChange={this.setFrameSize}
            />
          </label>

          <label htmlFor="itemId">
            Item width:
            <input
              id="itemId"
              className="input"
              type="number"
              value={itemWidth}
              min={130}
              max={260}
              step={10}
              onChange={this.setImageWidth}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation duration:
            <input
              id="animationDuration"
              className="inputs__input"
              type="number"
              value={animationDuration}
              step={10}
              onChange={this.setAnimationDuration}
            />
          </label>

          <label htmlFor="infinite">
            Infinite:
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.setInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
