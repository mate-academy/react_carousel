import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const DEFAULTS_VALUES = {
  MIN: 1,
  MAX: 10,
  STEP: 10,
};

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

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;

    if (newValue > 0) {
      this.setState({ itemWidth: newValue });
    } else {
      this.setState({ itemWidth: 0 });
    }
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = +event.target.value;

    if (newValue > 0) {
      this.setState({ animationDuration: newValue });
    } else {
      this.setState({ animationDuration: 0 });
    }
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__fields">
          <div className="wrapper">
            <label htmlFor="stepId">Step</label>
            <input
              id="stepId"
              className="wrapper__field"
              type="number"
              min={DEFAULTS_VALUES.MIN}
              max={DEFAULTS_VALUES.MAX}
              value={step}
              onChange={this.handleStepChange}
            />
          </div>

          <div className="wrapper">
            <label htmlFor="frameId">Visible images</label>
            <input
              id="frameId"
              className="wrapper__field"
              type="number"
              min={DEFAULTS_VALUES.MIN}
              max={DEFAULTS_VALUES.MAX}
              value={frameSize}
              onChange={this.handleFrameSizeChange}
            />
          </div>

          <div className="wrapper">
            <label htmlFor="itemId">Image width</label>
            <input
              className="wrapper__field"
              id="itemId"
              type="number"
              step={DEFAULTS_VALUES.STEP}
              value={itemWidth}
              onChange={this.handleItemWidthChange}
            />
          </div>

          <div className="wrapper">
            <label htmlFor="animationDuration">Animation duration</label>
            <input
              id="animationDuration"
              className="wrapper__field"
              type="number"
              min={0}
              step={DEFAULTS_VALUES.STEP}
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
            />
          </div>

          <div className="wrapper wrapper--checkbox">
            <label htmlFor="infinite">Infinite</label>
            <input
              id="infinite"
              type="checkbox"
              step={DEFAULTS_VALUES.STEP}
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </div>
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
