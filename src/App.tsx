import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
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

  setStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +e.target.value });
  };

  setItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +e.target.value });
  };

  setFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +e.target.value });
  };

  setAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +e.target.value });
  };

  setInfinite = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
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
        <h1>Carousel with {images.length} images</h1>

        <form action="/">
          <label
            className="form__label"
            htmlFor="itemId"
          >
            Item Width
            <input
              type="number"
              className="form__input"
              name="itemWidth"
              id="itemId"
              min={130}
              max={260}
              value={itemWidth}
              onChange={this.setItemWidth}
            />
          </label>

          <label
            className="form__label"
            htmlFor="frameId"
          >
            Frame Size
            <input
              type="number"
              className="form__input"
              name="frameSize"
              id="frameId"
              min={3}
              max={images.length}
              step={1}
              value={frameSize}
              onChange={this.setFrameSize}
            />
          </label>

          <label
            className="form__label"
            htmlFor="stepId"
          >
            Step
            <input
              type="number"
              className="form__input"
              name="step"
              id="stepId"
              min={3}
              max={10}
              value={step}
              onChange={this.setStep}
            />
          </label>

          <label
            className="form__label"
            htmlFor="animationDurationId"
          >
            Animation Duration
            <input
              type="number"
              className="form__input"
              name="step"
              id="animationDurationId"
              min={1000}
              max={3000}
              step={500}
              value={animationDuration}
              onChange={this.setAnimationDuration}
            />
          </label>

          <label
            className="form__label"
            htmlFor="checkboxId"
          >
            Infinite
            <input
              type="checkbox"
              className="form__input"
              name="checkbox"
              id="checkboxId"
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

export default App;
