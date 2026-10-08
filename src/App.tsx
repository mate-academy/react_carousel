import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

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

  onFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  onStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  onItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  onAnimationDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  onInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="app">
        <h1 className="app__heading" data-cy="title">
          Carousel
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          className="form"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <label htmlFor="frameId">
            Frame Size: &nbsp;
            <input
              type="number"
              id="frameId"
              min={1}
              max={5}
              step={1}
              value={frameSize}
              onChange={this.onFrameSizeChange}
            />
          </label>

          <label htmlFor="stepId">
            Rolling step: &nbsp;
            <input
              type="number"
              id="stepId"
              min={1}
              max={3}
              step={1}
              value={step}
              onChange={this.onStepChange}
            />
          </label>

          <label htmlFor="itemId">
            Image width: &nbsp;
            <input
              type="number"
              id="itemId"
              min={60}
              max={230}
              step={1}
              value={itemWidth}
              onChange={this.onItemWidthChange}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation Duration: &nbsp;
            <input
              type="number"
              id="animationDuration"
              min={500}
              max={3000}
              step={100}
              value={animationDuration}
              onChange={this.onAnimationDurationChange}
            />
          </label>

          <label className="infinityBtnContainer" htmlFor="infinite">
            Infinite:
            <input
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={this.onInfiniteChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
