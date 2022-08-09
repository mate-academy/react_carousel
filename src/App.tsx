import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
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

    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: Number(e.target.value),
    });
  };

  changeNumberOfImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= this.state.images.length) {
      this.setState({
        frameSize: Number(e.target.value),
      });
    }
  };

  changeScrollNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: Number(+e.target.value),
    });
  };

  changeDurationAnimation = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: Number(+e.target.value),
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />

        <label htmlFor="itemId">
          Enter width of images
          <input
            type="number"
            value={itemWidth}
            id="itemId"
            placeholder="item width"
            onChange={this.changeWidth}
          />
        </label>
        <br />
        <label htmlFor="frameId">
          Enter number of images in a row
          <input
            type="number"
            value={frameSize}
            id="frameId"
            placeholder="frame size"
            onChange={this.changeNumberOfImg}
          />
        </label>
        <br />
        <label htmlFor="stepId">
          Enter number of images to scroll
          <input
            type="number"
            value={step}
            id="stepId"
            placeholder="step"
            onChange={this.changeScrollNumber}
          />
        </label>
        <br />
        <label htmlFor="animationId">
          Enter the duration of rotation
          <input
            type="number"
            value={animationDuration}
            id="animationId"
            placeholder="step"
            onChange={this.changeDurationAnimation}
          />
        </label>
      </div>
    );
  }
}

export default App;
