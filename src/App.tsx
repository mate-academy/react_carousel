import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  step: number,
  frameSize: number,
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
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinite: false,
  };

  changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= 130) {
      this.setState({ itemWidth: +event.target.value });
    }
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({ step: +event.target.value });
    }
  };

  changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({ frameSize: +event.target.value });
    }
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({ animationDuration: +event.target.value });
    }
  };

  changeInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          step={step}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__form">
          <label className="App__label">
            Image size:
            <input
              className="App__input"
              type="number"
              step="10"
              min="130"
              value={itemWidth}
              onChange={this.changeItemWidth}
            />
          </label>

          <label className="App__label">
            Step:
            <input
              className="App__input"
              type="number"
              min="1"
              max="5"
              value={step}
              onChange={this.changeStep}
            />
          </label>

          <label className="App__label">
            How many images are seen:
            <input
              className="App__input"
              type="number"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={this.changeFrameSize}
            />
          </label>

          <label className="App__label">
            Duration of animation:
            <input
              className="App__input"
              type="number"
              min="0"
              max="10000"
              step="100"
              value={animationDuration}
              onChange={this.changeAnimationDuration}
            />
          </label>

          <label className="App__label">
            Infinite:
            <input
              className="App__input"
              type="checkbox"
              onChange={this.changeInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
