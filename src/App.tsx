import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Image } from './react-app-env';

interface State {
  images: Image[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    images: [
      { src: './img/1.png', id: 1 },
      { src: './img/2.png', id: 2 },
      { src: './img/3.png', id: 3 },
      { src: './img/4.png', id: 4 },
      { src: './img/5.png', id: 5 },
      { src: './img/6.png', id: 6 },
      { src: './img/7.png', id: 7 },
      { src: './img/8.png', id: 8 },
      { src: './img/9.png', id: 9 },
      { src: './img/10.png', id: 10 },
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinity: false,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handleInfinityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinity: event.target.checked });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="App__title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={infinity}
        />

        <div className="inputs">
          <h2 className="inputs__title">Make a choice</h2>

          <div className="inputs__input input">
            <label htmlFor="itemId">
              <strong className="input__text">Emodjies width:</strong>
              <span className="input__value">{` ${itemWidth}px`}</span>
            </label>

            <input
              id="itemId"
              type="range"
              name="itemWidth"
              value={itemWidth}
              min="100"
              max="200"
              onChange={this.handleItemWidthChange}
              className="input_range"
            />
          </div>

          <div className="inputs__input input">
            <label htmlFor="frameId">
              <strong className="input__text">Frame size:</strong>
              <span className="input__value">{` ${frameSize}`}</span>
            </label>

            <input
              id="frameId"
              type="range"
              name="frameSize"
              value={frameSize}
              min="2"
              max="5"
              onChange={this.handleFrameSizeChange}
              className="input_range"
            />
          </div>

          <div className="inputs__input input">
            <label htmlFor="stepId">
              <strong className="input__text">Step:</strong>
              <span className="input__value">{` ${step}`}</span>
            </label>

            <input
              id="stepId"
              type="range"
              name="step"
              value={step}
              min="2"
              max="5"
              onChange={this.handleStepChange}
              className="input_range"
            />
          </div>

          <div className="inputs__input input">
            <label htmlFor="animationDuration">
              <strong className="input__text">Animation duration:</strong>
              <span className="input__value">{` ${animationDuration}ms`}</span>
            </label>

            <input
              id="animationDuration"
              type="range"
              name="animationDuration"
              value={animationDuration}
              min="1000"
              max="3000"
              onChange={this.handleAnimationDurationChange}
              className="input_range"
            />
          </div>

          <div className="inputs__input input input--checkbox">
            <label className="input__text" htmlFor="infinity">
              <strong>Infinity</strong>
            </label>

            <input
              id="infinity"
              type="checkbox"
              name="infinity"
              checked={infinity}
              onChange={this.handleInfinityChange}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
