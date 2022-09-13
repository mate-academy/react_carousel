import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(event.target.value) });
  };

  handleFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(event.target.value) });
  };

  handleStep = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(event.target.value) });
  };

  handleAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: Number(event.target.value) });
  };

  handleInfinite = (event: ChangeEvent<HTMLInputElement>) => {
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="controls">
          <label>
            {'ItemWidth: '}
            <input
              type="number"
              name="itemWidth"
              id="ItemWidth"
              defaultValue={itemWidth}
              onChange={this.handleItemWidth}
            />
          </label>

          <label>
            {'FrameSize: '}
            <input
              type="number"
              name="frameSize"
              id="frameSize"
              defaultValue="2"
              onChange={this.handleFrameSize}
            />
          </label>

          <label>
            {'Step: '}
            <input
              type="number"
              name="step"
              id="step"
              defaultValue="2"
              onChange={this.handleStep}
            />
          </label>

          <label>
            {'AnimationDuration: '}
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              defaultValue="1000"
              onChange={this.handleAnimationDuration}
            />
          </label>

          <label>
            {'Infinite: '}
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={infinite}
              onChange={this.handleInfinite}
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

export default App;
