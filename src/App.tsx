import React, { ChangeEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
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
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
  };

  handleChangeItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleChangeFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleChangeStep = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleChangeAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          step={step}
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
        <div className="inputsContainer">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={this.handleChangeItemWidth}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={this.handleChangeFrameSize}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={this.handleChangeStep}
            />
          </label>
          <label htmlFor="animationDurationInput">
            Animation Duration:
            <input
              id="animationDudationInput"
              type="number"
              value={animationDuration}
              onChange={this.handleChangeAnimationDuration}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
