import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
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
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  toggleInfinite = () => {
    this.setState((prevState) => ({ infinite: !prevState.infinite }));
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <label htmlFor="itemId">
          {'Items width: '}
          <input
            id="itemId"
            type="number"
            defaultValue={itemWidth}
            onChange={(event) => {
              this.setState({ itemWidth: Number(event.target.value) });
            }}
          />
        </label>

        <label htmlFor="frameId">
          {'Amount of images in frame: '}
          <input
            id="frameId"
            type="number"
            min={1}
            max={5}
            defaultValue={frameSize}
            onChange={(event) => {
              this.setState({ frameSize: Number(event.target.value) });
            }}
          />
        </label>

        <label htmlFor="stepId">
          {'Step size: '}
          <input
            id="stepId"
            type="number"
            min={1}
            max={5}
            defaultValue={step}
            onChange={(event) => {
              this.setState({ step: Number(event.target.value) });
            }}
          />
        </label>

        <label htmlFor="animationId">
          {'Set animation duration in ms: '}
          <input
            id="animationId"
            type="number"
            step="100"
            defaultValue={animationDuration}
            onChange={(event) => {
              this.setState({ animationDuration: Number(event.target.value) });
            }}
          />
        </label>

        <label htmlFor="infiniteId">
          {'Infinite: '}
          <input
            id="infiniteId"
            type="checkbox"
            defaultChecked={infinite}
            onChange={this.toggleInfinite}
          />
        </label>
      </div>
    );
  }
}

export default App;
