import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleAnimationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">

        <h1 data-cy="title" className="App__title">
          {`Carousel with ${images.length} images`}
        </h1>

        <label htmlFor="itemId" className="App__field">
          Item Width:
          <input
            type="number"
            name="item-width"
            id="itemId"
            className="App__input"
            value={itemWidth}
            min={20}
            max={500}
            step={5}
            onChange={this.handleItemWidthChange}
          />
          px
        </label>

        <label htmlFor="frameId" className="App__field">
          Frame Size:
          <input
            type="number"
            name="frame-size"
            id="frameId"
            className="App__input"
            value={frameSize}
            min={1}
            max={images.length - 1}
            onChange={this.handleFrameSizeChange}
          />
        </label>

        <label htmlFor="stepId" className="App__field">
          Step:
          <input
            type="number"
            name="step"
            id="stepId"
            className="App__input"
            value={step}
            min={1}
            max={images.length - 1}
            onChange={this.handleStepChange}
          />
        </label>

        <label htmlFor="animationId" className="App__field">
          Animation Duration:
          <input
            type="number"
            name="animation-duration"
            id="animationId"
            className="App__input"
            value={animationDuration}
            min={0}
            max={10000}
            step={100}
            onChange={this.handleAnimationChange}
          />
          ms
        </label>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
