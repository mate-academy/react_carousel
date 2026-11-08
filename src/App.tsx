import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize?: number;
  step?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
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

  handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: Number(event.target.value),
    });
  };

  handleFrameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: Number(event.target.value),
    });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: Number(event.target.value),
    });
  };

  handleAnimationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: Number(event.target.value),
    });
  };

  render() {
    const { images, itemWidth, frameSize, animationDuration, step } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">Item width</label>

        <input
          type="number"
          id="itemId"
          value={itemWidth}
          onChange={this.handleItemChange}
        />

        <label htmlFor="frameId">Frame Size</label>

        <input
          type="number"
          id="frameId"
          value={frameSize}
          onChange={this.handleFrameChange}
        />

        <label htmlFor="stepId">Step</label>

        <input
          type="number"
          id="stepId"
          value={step}
          onChange={this.handleStepChange}
        />

        <label htmlFor="animationId">Animation Duration</label>

        <input
          type="number"
          id="animationId"
          value={animationDuration}
          onChange={this.handleAnimationChange}
        />

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
