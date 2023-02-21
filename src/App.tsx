import { Component } from 'react';
import { Carousel } from './components/Carousel';

import './App.scss';

type State = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

export class App extends Component<{}, State> {
  state: Readonly<State> = {
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
    const itemWidth = +e.target.value;

    this.setState({ itemWidth });
  };

  handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frameSize = +e.target.value;

    this.setState({ frameSize });
  };

  handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const step = +e.target.value;

    this.setState({ step });
  };

  handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const animationDuration = +e.target.value;

    this.setState({ animationDuration });
  };

  handleInfiniteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const infinite = e.target.checked;

    this.setState({ infinite });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form action="#" className="App__parameters">
          <label htmlFor="itemId">
            Item width:
            <input
              id="itemId"
              type="number"
              defaultValue={itemWidth}
              min={130}
              max={260}
              step={10}
              onChange={this.handleItemWidthChange}
            />
          </label>
          <label htmlFor="frameId">
            Frame size:
            <input
              id="frameId"
              type="number"
              defaultValue={frameSize}
              min={1}
              max={images.length}
              step={1}
              onChange={this.handleFrameSizeChange}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              defaultValue={step}
              min={1}
              max={images.length}
              step={1}
              onChange={this.handleStepChange}
            />
          </label>
          <label htmlFor="animationId">
            Animation duration:
            <input
              id="animationId"
              type="number"
              defaultValue={animationDuration}
              min={500}
              max={5000}
              step={100}
              onChange={this.handleAnimationDurationChange}
            />
          </label>
          <label htmlFor="infiniteId">
            Infinite:
            <input
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>
        </form>

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
