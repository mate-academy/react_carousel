import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type State = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

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

  setStep = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ step: +e.target.value });
  };

  setWidth = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ itemWidth: +e.target.value });
  };

  setAnimation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: +e.target.value });
  };

  setFrame = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ frameSize: +e.target.value });
  };

  setInfinitie = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ infinite: e.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__inputs">
          <label htmlFor="itemId">
            Item width
            <input
              id="itemId"
              type="number"
              className="App__input"
              max={260}
              min={65}
              value={itemWidth}
              onChange={this.setWidth}
            />
          </label>

          <label htmlFor="stepId">
            Step
            <input
              id="stepId"
              type="number"
              className="App__input"
              max={10}
              min={1}
              value={step}
              onChange={this.setStep}
            />
          </label>

          <label htmlFor="frameId">
            Frame size
            <input
              id="frameId"
              type="number"
              className="App__input"
              max={10}
              min={1}
              value={frameSize}
              onChange={this.setFrame}
            />
          </label>

          <label>
            Animation duration
            <input
              type="number"
              className="App__input"
              max={5000}
              min={0}
              step={500}
              value={animationDuration}
              onChange={this.setAnimation}
            />
          </label>

          <label>
            Infinitie
            <input
              type="checkbox"
              className="App__input"
              name="infinite"
              onChange={this.setInfinitie}
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
