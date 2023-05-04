import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export interface State {
  images: string[];
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

  hadleChangeSteps = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(event.target.value) });
  };

  handleChangeFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: Number(event.target.value),
    });
  };

  handleChangeItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: Number(event.target.value),
    });
  };

  handleChangeAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: Number(event.target.value) * 1000,
    });
  };

  handleChangeInfinite = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infinite: Boolean(event.target.checked),
    });
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div className="containerOfInputs">
          <label
            htmlFor="stepId"
            className="containerOfInputs__label"
          >
            Step:
            <input
              onChange={this.hadleChangeSteps}
              type="number"
              id="stepId"
              value={step}
            />
          </label>

          <label
            htmlFor="frameId"
            className="containerOfInputs__label"
          >
            FrameSize:
            <input
              onChange={this.handleChangeFrameSize}
              type="number"
              id="frameId"
              value={frameSize}
            />
          </label>

          <label
            htmlFor="itemId"
            className="containerOfInputs__label"
          >
            Item Width:
            <input
              onChange={this.handleChangeItemWidth}
              type="number"
              id="itemId"
              value={itemWidth}
            />
          </label>

          <label
            htmlFor="animationId"
            className="containerOfInputs__label"
          >
            Animation Duration(seconds):
            <input
              onChange={this.handleChangeAnimationDuration}
              type="number"
              id="animationId"
              value={animationDuration / 1000}
            />
          </label>

          <label
            htmlFor="infiniteId"
            className="containerOfInputs__label"
          >
            Animation Infinite:
            <input
              onChange={this.handleChangeInfinite}
              type="checkbox"
              id="infiniteId"
            />

          </label>
        </div>
      </div>
    );
  }
}

export default App;
