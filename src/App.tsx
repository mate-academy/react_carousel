import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Props } from './types/Props';

class App extends React.Component<{}, Required<Props>> {
  state: Required<Props> = {
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

  handleItemWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value > 0 && value <= 500) {
      this.setState({ itemWidth: value });
    } else {
      alert('Please enter a value between 1 and 500 for item width.');
    }
  };

  handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const { images } = this.state;

    if (value > 0 && value <= images.length) {
      this.setState({ frameSize: value });
    } else {
      alert(`Frame size must be between 1 and ${images.length}.`);
    }
  };

  handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const { images } = this.state;

    if (value > 0 && value <= images.length) {
      this.setState({ step: value });
    } else {
      alert(`Step must be between 1 and ${images.length}.`);
    }
  };

  handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value > 0 && value <= 10000) {
      this.setState({ animationDuration: value });
    } else {
      alert('Please enter a value between 1 and 10000 for animation duration.');
    }
  };

  handleInfiniteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputGroup">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={this.handleItemWidthChange}
              min={1}
              max={500}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={this.handleFrameSizeChange}
              min={1}
              max={images.length}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={this.handleStepChange}
              min={1}
              max={images.length}
            />
          </label>
          <label>
            Animation Duration (ms):
            <input
              type="number"
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
              min={1}
              max={10000}
            />
          </label>
          <label className="checkbox-label">
            Turn on infinite Carousel
            <input
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>
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
