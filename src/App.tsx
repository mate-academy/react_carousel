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

enum Parameter {
  ItemWidth = 'itemWidth',
  FrameSize = 'frameSize',
  Step = 'step',
  AnimationDuration = 'animationDuration',
  Infinite = 'infinite',
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      min,
      max,
    } = event.target;
    const isValidValue = (+value >= +min && +value <= +max)
      || (name === Parameter.Infinite);

    if (isValidValue) {
      switch (name) {
        case Parameter.ItemWidth:
          this.setState({ itemWidth: +value });
          break;

        case Parameter.FrameSize:
          this.setState({ frameSize: +value });
          break;

        case Parameter.Step:
          this.setState({ step: +value });
          break;

        case Parameter.AnimationDuration:
          this.setState({ animationDuration: +value });
          break;

        case Parameter.Infinite:
          this.setState((state) => ({ infinite: !state.infinite }));
          break;

        default:
          return 0;
      }
    }

    return this.state;
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
        <h1
          data-cy="title"
          className="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <form className="form">
          <label htmlFor="step">
            Step:
            <input
              className="inputField"
              name="step"
              type="number"
              min={1}
              max={5}
              defaultValue={step}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="frameSize">
            FrameSize:
            <input
              className="inputField"
              name="frameSize"
              type="number"
              min={1}
              max={images.length}
              defaultValue={frameSize}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="itemWidth">
            ItemWidth:
            <input
              className="inputField"
              name="itemWidth"
              type="number"
              min={10}
              max={1000}
              step={10}
              defaultValue={itemWidth}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="animationDuration">
            AnimationDuration:
            <input
              className="inputField"
              name="animationDuration"
              type="number"
              min={500}
              max={1500}
              defaultValue={animationDuration}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="infinite">
            Infinite:
            <input
              className="inputField"
              name="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.handleChange}
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
