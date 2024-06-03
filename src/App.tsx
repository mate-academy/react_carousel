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

  isNumberPositive(number: number): boolean {
    return !isNaN(number) && number > 0;
  }

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemWidth = parseInt(event.target.value);

    if (this.isNumberPositive(newItemWidth)) {
      this.setState({ itemWidth: newItemWidth });
    }
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = parseInt(event.target.value);
    const fullSize = this.state.images.length;

    if (this.isNumberPositive(newFrameSize) && newFrameSize <= fullSize) {
      this.setState({ frameSize: newFrameSize });
    }
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value);

    if (this.isNumberPositive(newStep) && newStep <= this.state.images.length) {
      this.setState({ step: newStep });
    }
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAnimationDuration = parseInt(event.target.value);
    const animationDurationLimit = 10000;

    if (
      this.isNumberPositive(newAnimationDuration) &&
      newAnimationDuration <= animationDurationLimit
    ) {
      this.setState({ animationDuration: newAnimationDuration });
    }
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form>
          <label>
            <input
              name="itemWidth"
              type="number"
              value={itemWidth}
              required
              onChange={this.handleItemWidthChange}
            ></input>
            Item width
          </label>

          <br />

          <label>
            <input
              name="frameSize"
              type="number"
              value={frameSize}
              required
              onChange={this.handleFrameSizeChange}
            ></input>
            Frame size
          </label>

          <br />

          <label>
            <input
              name="step"
              type="number"
              value={step}
              required
              onChange={this.handleStepChange}
            ></input>
            Step
          </label>

          <br />

          <label>
            <input
              name="animationDuration"
              type="number"
              value={animationDuration}
              required
              onChange={this.handleAnimationDurationChange}
            ></input>
            Animation Duration
          </label>

          <br />

          <label>
            <input
              name="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            ></input>
            Infinite
          </label>
        </form>

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
