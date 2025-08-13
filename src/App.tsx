import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    infinite: false,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(event.target.value);

    this.setState({ itemWidth: newWidth });
  };

  handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = Number(event.target.value);

    this.setState({ frameSize: newFrameSize });
  };

  handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = Number(event.target.value);

    this.setState({ step: newStep });
  };

  handleAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnimationDuration = Number(event.target.value);

    this.setState({ animationDuration: newAnimationDuration });
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    document.title = 'Carousel';

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel</h1>
        <div>
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={this.handleItemWidthChange}
            min="1"
          />
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={this.handleFrameSize}
            min="1"
          />
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={this.handleStep}
            min="1"
          />
          <label htmlFor="animationDuration">AnimationDuration:</label>
          <input
            id="animationDuration"
            type="number"
            value={animationDuration}
            onChange={this.handleAnimationDuration}
            min="500"
          />
          <label htmlFor="infinite">Infinite:</label>
          <input
            id="infinite"
            type="checkbox"
            checked={infinite}
            onChange={this.handleInfiniteChange}
          />
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
