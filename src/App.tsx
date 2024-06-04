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
    let newFrameSize = parseInt(event.target.value);
    const { images, infinite } = this.state;
    const listSize = images.length;

    if (this.isNumberPositive(newFrameSize)) {
      if (!infinite && newFrameSize > listSize) {
        newFrameSize = listSize;
      }

      this.setState({ frameSize: newFrameSize });
    }
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value);

    if (this.isNumberPositive(newStep)) {
      this.setState({ step: newStep });
    }
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAnimationDuration = parseInt(event.target.value);

    if (this.isNumberPositive(newAnimationDuration)) {
      this.setState({ animationDuration: newAnimationDuration });
    }
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { images, infinite } = this.state;
    let { frameSize } = this.state;
    const listSize = images.length;

    if (infinite && frameSize > listSize) {
      frameSize = listSize;
    }

    this.setState({ frameSize, infinite: event.target.checked });
  };

  render(): React.ReactNode {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form>
          <label htmlFor="itemId">Item width</label>

          <input
            id="itemId"
            name="itemWidth"
            type="number"
            value={itemWidth}
            required
            onChange={this.handleItemWidthChange}
          ></input>

          <br />

          <label htmlFor="frameId">Frame size</label>

          <input
            id="frameId"
            name="frameSize"
            type="number"
            value={frameSize}
            required
            onChange={this.handleFrameSizeChange}
          ></input>

          <br />

          <label htmlFor="stepId">Step</label>

          <input
            id="stepId"
            name="step"
            type="number"
            value={step}
            required
            onChange={this.handleStepChange}
          ></input>

          <br />

          <label htmlFor="animationId">Animation Duration</label>

          <input
            id="animationId"
            name="animationDuration"
            type="number"
            value={animationDuration}
            required
            onChange={this.handleAnimationDurationChange}
          ></input>

          <br />

          <label htmlFor="infiniteId">Infinite</label>

          <input
            id="infiniteId"
            name="infinite"
            type="checkbox"
            checked={infinite}
            onChange={this.handleInfiniteChange}
          ></input>
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
