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

  handleItemWidthChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const nextRaw = Number(e.target.value);

    if (Number.isFinite(nextRaw)) {
      const next = Math.max(130, Math.min(600, nextRaw));

      this.setState({ itemWidth: next });
    }
  };

  handleFrameSizeChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const nextRaw = Number(e.target.value);

    if (Number.isFinite(nextRaw)) {
      const max = this.state.images.length;
      const next = Math.max(1, Math.min(max, nextRaw));

      this.setState({ frameSize: next });
    }
  };

  handleStepChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const nextRaw = Number(e.target.value);

    if (Number.isFinite(nextRaw)) {
      const max = this.state.images.length;
      const next = Math.max(1, Math.min(max, nextRaw));

      this.setState({ step: next });
    }
  };

  handleAnimationDurationChange: React.ChangeEventHandler<HTMLInputElement> =
    e => {
      const nextRaw = Number(e.target.value);

      if (Number.isFinite(nextRaw)) {
        const next = Math.max(0, Math.min(10000, nextRaw));

        this.setState({ animationDuration: next });
      }
    };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label>
          Item width (px):
          <input
            type="number"
            value={itemWidth}
            min={130}
            max={600}
            step={1}
            onChange={this.handleItemWidthChange}
          />
        </label>

        <label>
          Frame size: {frameSize}
          <input
            type="range"
            value={frameSize}
            min={1}
            max={images.length}
            step={1}
            onChange={this.handleFrameSizeChange}
          />
        </label>

        <label>
          Step: {step}
          <input
            type="range"
            value={step}
            min={1}
            max={images.length}
            step={1}
            onChange={this.handleStepChange}
          />
        </label>

        <label>
          Animation duration (ms): {animationDuration}
          <input
            type="range"
            value={animationDuration}
            min={0}
            max={3000}
            step={50}
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
