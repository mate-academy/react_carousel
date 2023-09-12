import React, { ChangeEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

  handleStepChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: Number(event.target.value),
    });
  };

  handleFrameSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: Number(event.target.value),
    });
  };

  handleItemWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: Number(event.target.value),
    });
  };

  handleAnimationDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: Number(event.target.value),
    });
  };

  handleInfiniteChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infinite: Boolean(event.target.value),
    });
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <fieldset className="App__parameters">
          <label htmlFor="step" className="App__parameter">
            <input
              id="step"
              className="App__input"
              type="number"
              name="step"
              value={step}
              min={1}
              max={images.length}
              onChange={this.handleStepChange}
            />
            Step
          </label>

          <label htmlFor="frameSize" className="App__parameter">
            <input
              id="frameSize"
              className="App__input"
              type="number"
              name="FrameSize"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={this.handleFrameSizeChange}
            />
            Frame Size
          </label>

          <label htmlFor="itemWidth" className="App__parameter">
            <input
              id="itemWidth"
              className="App__input"
              type="number"
              name="ItemWidth"
              value={itemWidth}
              min={50}
              max={400}
              onChange={this.handleItemWidthChange}
            />
            Item Width
          </label>

          <label htmlFor="animation" className="App__parameter">
            <input
              id="animation"
              className="App__input"
              type="number"
              value={animationDuration}
              min={300}
              max={5000}
              onChange={this.handleAnimationDurationChange}
            />
            Animation Duration
          </label>

          <label
            htmlFor="isInfinite"
            className="App__parameter"
          >
            <input
              type="checkbox"
              className="App__input App__input-checkbox"
              id="isInfinite"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
            Infinite Scroll
          </label>
        </fieldset>
      </div>
    );
  }
}

export default App;
