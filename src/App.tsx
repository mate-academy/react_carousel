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

  setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value,
      name,
      checked,
      type,
    } = e.target;

    if (name === 'frameSize') {
      this.setState((prevState) => ({
        ...prevState,
        frameSize: +value,
      }));
    }

    this.setState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : +value,
    }));
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
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <form action="/">
          <label
            className="form__label"
            htmlFor="itemId"
          >
            Item width
            <input
              type="number"
              className="form__input"
              name="itemWidth"
              id="itemId"
              min={130}
              max={260}
              value={itemWidth}
              onChange={this.setInput}
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
              min={1}
              max={images.length}
              step={1}
              value={frameSize}
              onChange={this.setInput}
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
              min={1}
              max={images.length}
              step={1}
              value={step}
              onChange={this.setInput}
            />
          </label>

          <label
            className="form__label"
          >
            Animation Duration
            <input
              type="number"
              className="form__input"
              name="animationDuration"
              id="animationDurationId"
              min={500}
              max={3000}
              step={500}
              value={animationDuration}
              onChange={this.setInput}
            />
          </label>

          <label
            className="form__label"
          >
            Infinite
            <input
              type="checkbox"
              className="form__input"
              name="infinite"
              id="infiniteId"
              onChange={this.setInput}
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
