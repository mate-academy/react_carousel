import React from 'react';
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
  state: State = {
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

  onItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  onFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  onStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  onDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  onInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">
          itemWidth
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={this.onItemWidthChange}
          />
        </label>

        <label htmlFor="frameId">
          frameSize
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={this.onFrameSizeChange}
          />
        </label>

        <label htmlFor="stepId">
          step
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={this.onStepChange}
          />
        </label>

        <label htmlFor="animationId">
          animationDuration
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={this.onDurationChange}
          />
        </label>

        <label>
          infinite
          <input
            type="checkbox"
            checked={infinite}
            onChange={this.onInfiniteChange}
          />
        </label>

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
