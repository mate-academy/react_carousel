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
    this.setState({ itemWidth: +event.target.value });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__fields">
          <div className="wrapper">
            <label htmlFor="step">Step</label>
            <input
              id="step"
              className="wrapper__field"
              type="number"
              min={1}
              max={10}
              value={step}
              onChange={this.handleStepChange}
            />
          </div>

          <div className="wrapper">
            <label htmlFor="frameSize">Visible images</label>
            <input
              id="frameSize"
              className="wrapper__field"
              type="number"
              min={1}
              max={10}
              value={frameSize}
              onChange={this.handleFrameSizeChange}
            />
          </div>

          <div className="wrapper">
            <label htmlFor="itemWidth">Image width</label>
            <input
              className="wrapper__field"
              id="itemWidth"
              type="number"
              min={130}
              step={10}
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
              min={1000}
              step={100}
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
            />
          </div>

          <div className="wrapper wrapper--checkbox">
            <label htmlFor="infinite">Infinite</label>
            <input
              id="infinite"
              type="checkbox"
              min={1000}
              step={100}
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
