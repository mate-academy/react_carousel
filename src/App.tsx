import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemWidth = Number(event.target.value);

    this.setState({
      itemWidth: newItemWidth,
    });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = Number(event.target.value);

    this.setState({
      frameSize: newFrameSize,
    });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = Number(event.target.value);

    this.setState({
      step: newStep,
    });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAnimationDuration = Number(event.target.value);

    this.setState({
      animationDuration: newAnimationDuration,
    });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">
          Item width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={this.handleItemWidthChange}
          />
        </label>

        <label htmlFor="frameId">
          Frame size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={this.handleFrameSizeChange}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={this.handleStepChange}
          />
        </label>

        <label htmlFor="durationId">
          AnimationDuration:
          <input
            id="durationId"
            type="number"
            value={animationDuration}
            onChange={this.handleAnimationDurationChange}
          />
        </label>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={true}
        />
      </div>
    );
  }
}

export default App;
