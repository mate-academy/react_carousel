import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  images: string[];
}

class App extends React.Component<{}, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
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
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10) || 3;

    this.setState({ step: newStep });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = parseInt(event.target.value, 10) || 3;

    this.setState({ frameSize: newFrameSize });
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemWidth = parseInt(event.target.value, 10) || 130;

    this.setState({ itemWidth: newItemWidth });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAnimationDuration = parseInt(event.target.value, 10) || 1000;

    this.setState({ animationDuration: newAnimationDuration });
  };

  handleInfiniteChange = () => {
    this.setState(prevState => ({ infinite: !prevState.infinite }));
  };

  render() {
    const { step, frameSize, itemWidth, animationDuration, infinite, images } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">Item width</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={this.handleItemWidthChange}
        />

        <label htmlFor="frameId">Frame size</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={this.handleFrameSizeChange}
        />

        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={this.handleStepChange}
        />

        <label htmlFor="animationDurationId">Animation duration</label>
        <input
          id="animationDurationId"
          type="number"
          value={animationDuration}
          onChange={this.handleAnimationDurationChange}
        />

        <label htmlFor="infiniteId">Is infinite</label>
        <input
          id="infiniteId"
          type="checkbox"
          checked={infinite}
          onChange={this.handleInfiniteChange}
        />

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
